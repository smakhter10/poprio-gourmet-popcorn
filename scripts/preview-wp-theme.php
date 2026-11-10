<?php
/**
 * Standalone Local WordPress Theme Preview Server
 *
 * Runs via: php -S localhost:8088 scripts/preview-wp-theme.php
 */

$uri = parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH );
$doc_root = realpath( __DIR__ . '/..' );

// Handle static theme assets directly
if ( preg_match( '/\.(?:png|jpg|jpeg|gif|webp|svg|mp4|webm|css|js|map|woff|woff2|ttf|json)$/', $uri ) ) {
	$file_path = $doc_root . $uri;
	if ( ! file_exists( $file_path ) ) {
		// Map /wp-content/themes/poprio-theme/ to physical dir
		if ( str_starts_with( $uri, '/wp-content/themes/poprio-theme/' ) ) {
			$sub = substr( $uri, strlen( '/wp-content/themes/poprio-theme/' ) );
			$file_path = $doc_root . '/wp-content/themes/poprio-theme/' . $sub;
		}
	}

	if ( file_exists( $file_path ) ) {
		$ext = pathinfo( $file_path, PATHINFO_EXTENSION );
		$mimes = array(
			'css'   => 'text/css',
			'js'    => 'application/javascript',
			'webp'  => 'image/webp',
			'png'   => 'image/png',
			'mp4'   => 'video/mp4',
			'json'  => 'application/json',
			'svg'   => 'image/svg+xml',
		);
		header( 'Content-Type: ' . ( $mimes[ $ext ] ?? 'application/octet-stream' ) );
		readfile( $file_path );
		exit;
	}
}

// Otherwise, emulate WordPress template rendering
define( 'ABSPATH', $doc_root . '/' );

function get_template_directory() {
	return realpath( __DIR__ . '/../wp-content/themes/poprio-theme' );
}
function get_template_directory_uri() {
	return '/wp-content/themes/poprio-theme';
}
function get_option( $name, $default = false ) {
	return $default;
}
function home_url( $path = '' ) {
	return '/' . ltrim( $path, '/' );
}
function wp_create_nonce( $action ) {
	return 'preview_nonce';
}
function rest_url( $path = '' ) {
	return '/wp-json/' . $path;
}
function esc_url_raw( $url ) {
	return $url;
}
function esc_url( $url ) {
	return htmlspecialchars( $url, ENT_QUOTES, 'UTF-8' );
}
function is_user_logged_in() {
	return false;
}
function current_user_can( $cap ) {
	return false;
}
function is_page( $slug ) {
	$u = parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH );
	return trim( $u, '/' ) === $slug;
}
function is_page_template( $template ) {
	return false;
}
function get_query_var( $var ) {
	return '';
}
function wp_json_encode( $data ) {
	return json_encode( $data );
}
function language_attributes() {
	echo 'lang="en"';
}
function bloginfo( $show ) {
	if ( 'charset' === $show ) echo 'UTF-8';
}
function body_class( $class = '' ) {
	echo 'class="home ' . esc_attr( $class ) . '"';
}
function wp_body_open() {
	// hook
}
function add_action( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
	// mock
}
function add_filter( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
	// mock
}
function add_theme_support( $feature, $args = null ) {
	// mock
}
function register_nav_menus( $locations = array() ) {
	// mock
}
function get_transient( $key ) {
	return false;
}
function set_transient( $key, $val, $exp ) {
	return true;
}
function wp_remote_get( $url, $args = array() ) {
	return false;
}
function is_wp_error( $thing ) {
	return false;
}
function wp_remote_retrieve_response_code( $res ) {
	return 404;
}
function esc_attr( $text ) {
	return htmlspecialchars( $text, ENT_QUOTES, 'UTF-8' );
}
function __( $text, $domain = 'default' ) {
	return $text;
}

// Track styles and scripts
$GLOBALS['wp_styles'] = array();
$GLOBALS['wp_scripts'] = array();
$GLOBALS['wp_inline_scripts'] = array();

function wp_enqueue_style( $handle, $src = '', $deps = array(), $ver = false ) {
	$GLOBALS['wp_styles'][ $handle ] = $src;
}
function wp_enqueue_script( $handle, $src = '', $deps = array(), $ver = false, $in_footer = false ) {
	$GLOBALS['wp_scripts'][ $handle ] = $src;
}
function wp_add_inline_script( $handle, $data, $position = 'after' ) {
	$GLOBALS['wp_inline_scripts'][] = $data;
}

function wp_head() {
	foreach ( $GLOBALS['wp_styles'] as $handle => $src ) {
		echo '<link rel="stylesheet" id="' . esc_attr( $handle ) . '" href="' . esc_url( $src ) . '" />' . "\n";
	}
	foreach ( $GLOBALS['wp_inline_scripts'] as $code ) {
		echo '<script>' . $code . '</script>' . "\n";
	}
	// Module preloads
	$assets = Poprio_Asset_Manifest::get_entry_assets();
	if ( ! empty( $assets['imports'] ) ) {
		foreach ( $assets['imports'] as $chunk ) {
			echo '<link rel="modulepreload" href="' . esc_url( $chunk ) . '" />' . "\n";
		}
	}
}

function wp_footer() {
	foreach ( $GLOBALS['wp_scripts'] as $handle => $src ) {
		echo '<script type="module" id="' . esc_attr( $handle ) . '" src="' . esc_url( $src ) . '"></script>' . "\n";
	}
}

function get_header() {
	require get_template_directory() . '/header.php';
}

function get_footer() {
	require get_template_directory() . '/footer.php';
}

require_once get_template_directory() . '/functions.php';

// Trigger enqueuing
poprio_enqueue_fonts();
poprio_enqueue_frontend_assets();

$path = trim( $uri, '/' );
if ( 'about' === $path ) {
	require get_template_directory() . '/page-about.php';
} elseif ( 'contact' === $path ) {
	require get_template_directory() . '/page-contact.php';
} else {
	require get_template_directory() . '/front-page.php';
}
