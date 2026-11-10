<?php
/**
 * Plugin Name:       POPRIO Visual Editor
 * Plugin URI:        https://eatpoprio.com
 * Description:       Companion visual editor backend, REST persistence API, and content schema for the POPRIO Gourmet Popcorn website.
 * Version:           1.0.0
 * Author:            POPRIO
 * Author URI:        https://eatpoprio.com
 * Text Domain:       poprio-visual-editor
 * Domain Path:       /languages
 * Requires at least: 6.2
 * Requires PHP:      8.0
 *
 * @package Poprio_Visual_Editor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'POPRIO_VE_VERSION', '1.0.0' );
define( 'POPRIO_VE_PATH', plugin_dir_path( __FILE__ ) );
define( 'POPRIO_VE_URL', plugin_dir_url( __FILE__ ) );

// Load includes
require_once POPRIO_VE_PATH . 'includes/class-content-schema.php';
require_once POPRIO_VE_PATH . 'includes/class-revision-manager.php';
require_once POPRIO_VE_PATH . 'includes/class-rest-api.php';

/**
 * Plugin activation: Seed default published schema if not yet present.
 */
function poprio_ve_activate() {
	$current = get_option( Poprio_Revision_Manager::OPTION_PUBLISHED, null );
	if ( empty( $current ) ) {
		$defaults = Poprio_Content_Schema::get_default_schema();
		update_option( Poprio_Revision_Manager::OPTION_PUBLISHED, $defaults, true );
	}
}
register_activation_hook( __FILE__, 'poprio_ve_activate' );

/**
 * Plugin deactivation.
 */
function poprio_ve_deactivate() {
	// Content is safely preserved in wp_options.
}
register_deactivation_hook( __FILE__, 'poprio_ve_deactivate' );

/**
 * Initialize REST API routes.
 */
add_action( 'rest_api_init', [ 'Poprio_REST_API', 'register_routes' ] );

/**
 * Public helper function for theme to retrieve current published content.
 *
 * @return array
 */
function poprio_ve_get_content(): array {
	if ( class_exists( 'Poprio_Revision_Manager' ) ) {
		return Poprio_Revision_Manager::get_published();
	}
	if ( class_exists( 'Poprio_Content_Schema' ) ) {
		return Poprio_Content_Schema::get_default_schema();
	}
	return [];
}
