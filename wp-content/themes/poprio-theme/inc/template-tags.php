<?php
/**
 * Template Tags & Content Helpers for POPRIO Theme
 *
 * Integrates theme rendering with POPRIO content schema and persistent options.
 *
 * @package PoprioTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Retrieve the current published POPRIO content schema, falling back to brand defaults.
 *
 * @return array Structured content schema.
 */
function poprio_get_published_content(): array {
	$published = get_option( 'poprio_content_published', null );
	if ( is_array( $published ) && ! empty( $published ) ) {
		return $published;
	}

	return poprio_get_default_content();
}

/**
 * Return default brand content matching the canonical POPRIO schema.
 *
 * Checks if companion plugin schema class is available; otherwise loads it or falls back cleanly.
 *
 * @return array Default content schema.
 */
function poprio_get_default_content(): array {
	// If companion plugin class is available
	if ( class_exists( 'Poprio_Content_Schema' ) ) {
		return Poprio_Content_Schema::get_default_schema();
	}

	// Try loading from plugins folder directly if file exists
	if ( defined( 'WP_PLUGIN_DIR' ) ) {
		$schema_file = WP_PLUGIN_DIR . '/poprio-visual-editor/includes/class-content-schema.php';
		if ( file_exists( $schema_file ) ) {
			require_once $schema_file;
			if ( class_exists( 'Poprio_Content_Schema' ) ) {
				return Poprio_Content_Schema::get_default_schema();
			}
		}
	}

	// Direct fallback to relative schema path from theme root
	$local_schema = dirname( __DIR__, 2 ) . '/plugins/poprio-visual-editor/includes/class-content-schema.php';
	if ( file_exists( $local_schema ) ) {
		require_once $local_schema;
		if ( class_exists( 'Poprio_Content_Schema' ) ) {
			return Poprio_Content_Schema::get_default_schema();
		}
	}

	// Fallback minimal safe structure
	return array(
		'version'    => '1.0.0',
		'updated_at' => gmdate( 'c' ),
		'meta'       => array(
			'name'             => 'POPRIO',
			'tagline'          => 'Gourmet Flavoured Popcorn',
			'domain'           => 'eatpoprio.com',
			'logo'             => array(
				'src'    => '/assets/brand/poprio-logo.webp',
				'alt'    => 'POPRIO Official Logo',
				'width'  => 240,
				'height' => 89,
			),
			'whatsappNumber'   => '8801705117793',
			'whatsappGreeting' => "Hi POPRIO! I'd like to know more about your popcorn flavours.",
			'socialLinks'      => array(
				array( 'id' => 'facebook', 'label' => 'POPRIO on Facebook', 'url' => 'https://facebook.com' ),
				array( 'id' => 'instagram', 'label' => 'POPRIO on Instagram', 'url' => 'https://instagram.com' ),
				array( 'id' => 'youtube', 'label' => 'POPRIO on YouTube', 'url' => 'https://youtube.com' ),
			),
		),
	);
}
