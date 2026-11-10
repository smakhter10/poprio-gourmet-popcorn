<?php
/**
 * PHP Verification Test for POPRIO Theme
 */

define( 'ABSPATH', __DIR__ . '/../' );

// Mock WordPress functions
function get_template_directory() {
	return realpath( __DIR__ . '/../wp-content/themes/poprio-theme' );
}
function get_template_directory_uri() {
	return 'http://example.com/wp-content/themes/poprio-theme';
}
function get_option( $name, $default = false ) {
	return $default;
}
function home_url() {
	return 'http://example.com';
}
function wp_create_nonce( $action ) {
	return 'test_nonce_123';
}
function rest_url( $path ) {
	return 'http://example.com/wp-json/' . $path;
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
	return false;
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

require_once get_template_directory() . '/inc/asset-manifest.php';
require_once get_template_directory() . '/inc/template-tags.php';

echo "=== POPRIO THEME PHP VERIFICATION ===\n";

// 1. Test Manifest Loader
$assets = Poprio_Asset_Manifest::get_entry_assets();
echo "1. Entrypoint Script: " . $assets['entry'] . "\n";
assert( ! empty( $assets['entry'] ), "Entry script must not be empty" );

echo "2. CSS Files: " . count( $assets['css'] ) . " found\n";
foreach ( $assets['css'] as $css ) {
	echo "   - $css\n";
}
assert( ! empty( $assets['css'] ), "CSS array must not be empty" );

echo "3. Preload Module Chunks: " . count( $assets['imports'] ) . " found\n";
foreach ( $assets['imports'] as $chunk ) {
	echo "   - $chunk\n";
}
assert( count( $assets['imports'] ) >= 3, "At least 3 imported chunks expected (vendor, animation, icons)" );

// 2. Test Content Schema
$content = poprio_get_published_content();
echo "4. Brand Name: " . $content['site']['name'] . "\n";
echo "5. WhatsApp Number: " . $content['site']['whatsapp']['number'] . "\n";
echo "6. Rotating Words: " . implode( ', ', $content['hero']['rotatingWords'] ) . "\n";
assert( $content['site']['whatsapp']['number'] === '8801705117793', "WhatsApp number must match brand" );

// 3. Verify disk existence of resolved files
$theme_dir = get_template_directory();
$manifest = Poprio_Asset_Manifest::get_manifest();
$all_exist = true;
foreach ( $manifest as $key => $item ) {
	if ( ! empty( $item['file'] ) ) {
		$disk_file = $theme_dir . '/dist/' . $item['file'];
		if ( ! file_exists( $disk_file ) ) {
			echo "MISSING FILE: $disk_file\n";
			$all_exist = false;
		}
	}
}
assert( $all_exist, "All manifest files must exist on disk" );

echo "\n>>> ALL PHP UNIT CHECKS PASSED SUCCESSFULLY! <<<\n";
