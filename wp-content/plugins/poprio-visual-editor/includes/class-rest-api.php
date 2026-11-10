<?php
/**
 * POPRIO REST API Controller
 *
 * Exposes secure REST endpoints for content retrieval, draft saving,
 * live publishing, rollback, and revision management.
 *
 * @package Poprio_Visual_Editor
 */

if ( ! defined( 'ABSPATH' ) && ! defined( 'POPRIO_TEST_MODE' ) ) {
	exit;
}

class Poprio_REST_API {

	const NAMESPACE = 'poprio/v1';

	/**
	 * Registers all POPRIO REST routes.
	 */
	public static function register_routes() {
		// 1. GET /content
		register_rest_route(
			self::NAMESPACE,
			'/content',
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ __CLASS__, 'handle_get_content' ],
				'permission_callback' => '__return_true',
			]
		);

		// 2. POST /content/draft
		register_rest_route(
			self::NAMESPACE,
			'/content/draft',
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => [ __CLASS__, 'handle_save_draft' ],
				'permission_callback' => [ __CLASS__, 'check_edit_permission' ],
			]
		);

		// 3. POST /content/publish
		register_rest_route(
			self::NAMESPACE,
			'/content/publish',
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => [ __CLASS__, 'handle_publish' ],
				'permission_callback' => [ __CLASS__, 'check_publish_permission' ],
			]
		);

		// 4. POST /content/reset
		register_rest_route(
			self::NAMESPACE,
			'/content/reset',
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => [ __CLASS__, 'handle_reset' ],
				'permission_callback' => [ __CLASS__, 'check_edit_permission' ],
			]
		);

		// 5. GET /revisions
		register_rest_route(
			self::NAMESPACE,
			'/revisions',
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ __CLASS__, 'handle_get_revisions' ],
				'permission_callback' => [ __CLASS__, 'check_edit_permission' ],
			]
		);

		// 6. POST /revisions/restore
		register_rest_route(
			self::NAMESPACE,
			'/revisions/restore',
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => [ __CLASS__, 'handle_restore_revision' ],
				'permission_callback' => [ __CLASS__, 'check_publish_permission' ],
			]
		);
	}

	/**
	 * Permission check for drafting / viewing admin data.
	 *
	 * @return bool|WP_Error
	 */
	public static function check_edit_permission() {
		if ( ! current_user_can( 'edit_pages' ) ) {
			return new WP_Error(
				'rest_forbidden',
				__( 'You do not have permission to edit POPRIO content.', 'poprio-visual-editor' ),
				[ 'status' => rest_authorization_required_code() ]
			);
		}
		return true;
	}

	/**
	 * Permission check for publishing content.
	 *
	 * @return bool|WP_Error
	 */
	public static function check_publish_permission() {
		if ( ! current_user_can( 'publish_pages' ) ) {
			return new WP_Error(
				'rest_forbidden',
				__( 'You do not have permission to publish POPRIO content.', 'poprio-visual-editor' ),
				[ 'status' => rest_authorization_required_code() ]
			);
		}
		return true;
	}

	/**
	 * GET /content
	 *
	 * Returns published content. If logged in with edit permission, includes draft if present.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public static function handle_get_content( $request ) {
		$published = Poprio_Revision_Manager::get_published();
		$can_edit  = current_user_can( 'edit_pages' );

		$response = [
			'status'    => 'success',
			'published' => $published,
		];

		if ( $can_edit ) {
			$draft = Poprio_Revision_Manager::get_draft();
			$response['draft']     = $draft;
			$response['has_draft'] = ( null !== $draft );
			$response['can_edit']  = true;
			$response['can_publish'] = current_user_can( 'publish_pages' );
		}

		return new WP_REST_Response( $response, 200 );
	}

	/**
	 * POST /content/draft
	 *
	 * Saves draft content without affecting the live site.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response|WP_Error
	 */
	public static function handle_save_draft( $request ) {
		$params  = $request->get_json_params();
		$content = is_array( $params ) && isset( $params['content'] ) ? $params['content'] : $params;

		if ( empty( $content ) || ! is_array( $content ) ) {
			return new WP_Error( 'invalid_data', 'Missing or invalid content payload.', [ 'status' => 400 ] );
		}

		$saved = Poprio_Revision_Manager::save_draft( $content );
		if ( is_wp_error( $saved ) ) {
			return $saved;
		}

		return new WP_REST_Response(
			[
				'status'  => 'success',
				'message' => 'Draft saved successfully.',
				'draft'   => $saved,
			],
			200
		);
	}

	/**
	 * POST /content/publish
	 *
	 * Saves and publishes content to the live site, adding a revision record.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response|WP_Error
	 */
	public static function handle_publish( $request ) {
		$params  = $request->get_json_params();
		$content = is_array( $params ) && isset( $params['content'] ) ? $params['content'] : $params;
		$summary = is_array( $params ) && isset( $params['summary'] ) ? sanitize_text_field( $params['summary'] ) : '';

		// If no content passed explicitly in body, check if there is an existing draft to publish
		if ( empty( $content ) || ! is_array( $content ) ) {
			$draft = Poprio_Revision_Manager::get_draft();
			if ( $draft ) {
				$content = $draft;
			} else {
				return new WP_Error( 'missing_content', 'No content payload or pending draft found to publish.', [ 'status' => 400 ] );
			}
		}

		$author_id = get_current_user_id();
		$published = Poprio_Revision_Manager::publish( $content, $summary, $author_id );

		if ( is_wp_error( $published ) ) {
			return $published;
		}

		return new WP_REST_Response(
			[
				'status'    => 'success',
				'message'   => 'Content published successfully to live site.',
				'published' => $published,
			],
			200
		);
	}

	/**
	 * POST /content/reset
	 *
	 * Resets draft or restores default values.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response|WP_Error
	 */
	public static function handle_reset( $request ) {
		$params = $request->get_json_params();
		$target = is_array( $params ) && isset( $params['target'] ) ? sanitize_key( $params['target'] ) : 'draft';

		// Resetting to defaults requires publish permission
		if ( 'defaults' === $target && ! current_user_can( 'publish_pages' ) ) {
			return new WP_Error( 'rest_forbidden', 'Only publishers can reset content to factory defaults.', [ 'status' => 403 ] );
		}

		$author_id = get_current_user_id();
		$content   = Poprio_Revision_Manager::reset( $target, $author_id );

		return new WP_REST_Response(
			[
				'status'  => 'success',
				'message' => 'defaults' === $target ? 'Reset all content to factory defaults.' : 'Draft discarded.',
				'content' => $content,
			],
			200
		);
	}

	/**
	 * GET /revisions
	 *
	 * Lists up to 10 past revisions.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public static function handle_get_revisions( $request ) {
		$revisions = Poprio_Revision_Manager::get_revisions();

		return new WP_REST_Response(
			[
				'status'    => 'success',
				'revisions' => $revisions,
			],
			200
		);
	}

	/**
	 * POST /revisions/restore
	 *
	 * Restores a specific revision by ID.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response|WP_Error
	 */
	public static function handle_restore_revision( $request ) {
		$params      = $request->get_json_params();
		$revision_id = is_array( $params ) && isset( $params['revision_id'] ) ? sanitize_text_field( $params['revision_id'] ) : '';

		if ( empty( $revision_id ) ) {
			return new WP_Error( 'missing_id', 'Parameter revision_id is required.', [ 'status' => 400 ] );
		}

		$author_id = get_current_user_id();
		$restored  = Poprio_Revision_Manager::restore_revision( $revision_id, $author_id );

		if ( is_wp_error( $restored ) ) {
			return $restored;
		}

		return new WP_REST_Response(
			[
				'status'    => 'success',
				'message'   => sprintf( 'Successfully restored revision %s.', $revision_id ),
				'published' => $restored,
			],
			200
		);
	}
}

