<?php
/**
 * POPRIO Revision Manager
 *
 * Handles storage, draft management, publishing, and rolling 10-revision history
 * for POPRIO visual editor content.
 *
 * @package Poprio_Visual_Editor
 */

if ( ! defined( 'ABSPATH' ) && ! defined( 'POPRIO_TEST_MODE' ) ) {
	exit;
}

class Poprio_Revision_Manager {

	const OPTION_PUBLISHED = 'poprio_content_published';
	const OPTION_DRAFT     = 'poprio_content_draft';
	const OPTION_HISTORY   = 'poprio_content_history';
	const MAX_REVISIONS    = 10;

	/**
	 * Returns the current published content, falling back to default schema if not set.
	 *
	 * @return array
	 */
	public static function get_published(): array {
		$data = get_option( self::OPTION_PUBLISHED, null );
		if ( ! is_array( $data ) || empty( $data ) ) {
			$defaults = Poprio_Content_Schema::get_default_schema();
			// Auto-seed if running inside full WordPress
			if ( function_exists( 'update_option' ) ) {
				update_option( self::OPTION_PUBLISHED, $defaults, true );
			}
			return $defaults;
		}
		return $data;
	}

	/**
	 * Returns current draft content, or null if no draft exists.
	 *
	 * @return array|null
	 */
	public static function get_draft(): ?array {
		$draft = get_option( self::OPTION_DRAFT, null );
		return is_array( $draft ) && ! empty( $draft ) ? $draft : null;
	}

	/**
	 * Saves a draft copy of the content.
	 *
	 * @param array $content Raw content array.
	 * @return array|WP_Error Sanitized saved content or error.
	 */
	public static function save_draft( array $content ) {
		$sanitized = Poprio_Content_Schema::validate_and_sanitize( $content );
		if ( is_wp_error( $sanitized ) ) {
			return $sanitized;
		}

		$sanitized['is_draft'] = true;
		update_option( self::OPTION_DRAFT, $sanitized, false );
		return $sanitized;
	}

	/**
	 * Publishes content: updates published option, clears draft, and pushes to rolling revision history.
	 *
	 * @param array  $content   Content array to publish.
	 * @param string $summary   Optional human-readable change summary.
	 * @param int    $author_id User ID of the publisher.
	 * @return array|WP_Error Published content or error.
	 */
	public static function publish( array $content, string $summary = '', int $author_id = 0 ) {
		$sanitized = Poprio_Content_Schema::validate_and_sanitize( $content );
		if ( is_wp_error( $sanitized ) ) {
			return $sanitized;
		}

		// Ensure draft flag is removed from published version
		unset( $sanitized['is_draft'] );
		$sanitized['published_at'] = gmdate( 'c' );

		// Update published option
		update_option( self::OPTION_PUBLISHED, $sanitized, true );

		// Clear pending draft
		delete_option( self::OPTION_DRAFT );

		// Record revision snapshot
		self::record_revision( $sanitized, $summary, $author_id );

		return $sanitized;
	}

	/**
	 * Resets content:
	 * - 'draft': deletes any pending draft
	 * - 'defaults': resets published content back to schema default and clears draft
	 *
	 * @param string $target 'draft' or 'defaults'
	 * @param int    $author_id
	 * @return array Current published content after reset
	 */
	public static function reset( string $target = 'draft', int $author_id = 0 ): array {
		if ( 'defaults' === $target ) {
			$defaults = Poprio_Content_Schema::get_default_schema();
			self::publish( $defaults, 'Reset to factory defaults', $author_id );
			return $defaults;
		}

		// Default: reset draft only
		delete_option( self::OPTION_DRAFT );
		return self::get_published();
	}

	/**
	 * Records a revision snapshot into the rolling history array (max 10 items).
	 *
	 * @param array  $snapshot  Sanitized content snapshot.
	 * @param string $summary   Change description.
	 * @param int    $author_id User ID.
	 * @return array New revision metadata.
	 */
	protected static function record_revision( array $snapshot, string $summary, int $author_id ): array {
		$history = get_option( self::OPTION_HISTORY, [] );
		if ( ! is_array( $history ) ) {
			$history = [];
		}

		$author_name = 'POPRIO Editor';
		if ( $author_id > 0 && function_exists( 'get_userdata' ) ) {
			$user = get_userdata( $author_id );
			if ( $user ) {
				$author_name = $user->display_name ?: $user->user_login;
			}
		}

		$revision_id = 'rev_' . gmdate( 'Ymd_His' ) . '_' . substr( md5( uniqid( '', true ) ), 0, 6 );

		$record = [
			'id'          => $revision_id,
			'timestamp'   => gmdate( 'c' ),
			'author_id'   => $author_id,
			'author_name' => $author_name,
			'summary'     => $summary ?: 'Content published',
			'data'        => $snapshot,
		];

		// Prepend newest revision
		array_unshift( $history, $record );

		// Cap at MAX_REVISIONS
		if ( count( $history ) > self::MAX_REVISIONS ) {
			$history = array_slice( $history, 0, self::MAX_REVISIONS );
		}

		update_option( self::OPTION_HISTORY, $history, false );

		return [
			'id'          => $record['id'],
			'timestamp'   => $record['timestamp'],
			'author_id'   => $record['author_id'],
			'author_name' => $record['author_name'],
			'summary'     => $record['summary'],
		];
	}

	/**
	 * Returns list of revision metadata (without heavy snapshot data).
	 *
	 * @return array
	 */
	public static function get_revisions(): array {
		$history = get_option( self::OPTION_HISTORY, [] );
		if ( ! is_array( $history ) ) {
			return [];
		}

		$list = [];
		foreach ( $history as $rev ) {
			if ( is_array( $rev ) && ! empty( $rev['id'] ) ) {
				$list[] = [
					'id'          => $rev['id'],
					'timestamp'   => $rev['timestamp'] ?? '',
					'author_id'   => $rev['author_id'] ?? 0,
					'author_name' => $rev['author_name'] ?? 'POPRIO Editor',
					'summary'     => $rev['summary'] ?? '',
				];
			}
		}

		return $list;
	}

	/**
	 * Retrieves a single full revision including data by ID.
	 *
	 * @param string $revision_id
	 * @return array|null
	 */
	public static function get_revision( string $revision_id ): ?array {
		$history = get_option( self::OPTION_HISTORY, [] );
		if ( ! is_array( $history ) ) {
			return null;
		}

		foreach ( $history as $rev ) {
			if ( is_array( $rev ) && ( $rev['id'] ?? '' ) === $revision_id ) {
				return $rev;
			}
		}

		return null;
	}

	/**
	 * Restores a specific revision by ID and publishes it.
	 *
	 * @param string $revision_id
	 * @param int    $author_id
	 * @return array|WP_Error
	 */
	public static function restore_revision( string $revision_id, int $author_id = 0 ) {
		$rev = self::get_revision( $revision_id );
		if ( ! $rev || empty( $rev['data'] ) ) {
			if ( class_exists( 'WP_Error' ) ) {
				return new WP_Error( 'not_found', 'Revision not found: ' . esc_html( $revision_id ), [ 'status' => 404 ] );
			}
			return false;
		}

		$summary = sprintf( 'Restored from revision %s (%s)', $revision_id, $rev['timestamp'] ?? '' );
		return self::publish( $rev['data'], $summary, $author_id );
	}
}

