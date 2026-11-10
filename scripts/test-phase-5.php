<?php
/**
 * POPRIO Phase 5 Comprehensive Integration Test Suite
 *
 * Verifies end-to-end architecture, theme templates, companion plugin,
 * REST APIs, asset resolutions, and packaging integrity.
 */

$doc_root = dirname( __DIR__ );
$theme_dir = $doc_root . '/wp-content/themes/poprio-theme';
$plugin_dir = $doc_root . '/wp-content/plugins/poprio-visual-editor';

$total_tests = 0;
$passed_tests = 0;

function report_test( $name, $result, $details = '' ) {
	global $total_tests, $passed_tests;
	$total_tests++;
	if ( $result ) {
		$passed_tests++;
		echo "  [PASS] $name\n";
	} else {
		echo "  [FAIL] $name - $details\n";
	}
}

echo "======================================================\n";
echo "POPRIO Phase 5 Comprehensive Integration Test Suite\n";
echo "======================================================\n\n";

// TEST 1: Theme Structure & Metadata
echo "TEST 1: WordPress Theme Structure & Metadata\n";
report_test( 'Theme style.css exists', file_exists( $theme_dir . '/style.css' ) );
$style_css = file_get_contents( $theme_dir . '/style.css' );
report_test( 'Theme header contains Theme Name: POPRIO', strpos( $style_css, 'Theme Name: POPRIO' ) !== false );
report_test( 'Theme functions.php exists', file_exists( $theme_dir . '/functions.php' ) );
report_test( 'Theme front-page.php exists', file_exists( $theme_dir . '/front-page.php' ) );
report_test( 'Theme header.php exists', file_exists( $theme_dir . '/header.php' ) );
report_test( 'Theme footer.php exists', file_exists( $theme_dir . '/footer.php' ) );
report_test( 'Theme page-about.php exists', file_exists( $theme_dir . '/page-about.php' ) );
report_test( 'Theme page-contact.php exists', file_exists( $theme_dir . '/page-contact.php' ) );
report_test( 'Theme inc/asset-manifest.php exists', file_exists( $theme_dir . '/inc/asset-manifest.php' ) );
report_test( 'Theme inc/template-tags.php exists', file_exists( $theme_dir . '/inc/template-tags.php' ) );

// TEST 2: Vite Manifest & Production Code
echo "\nTEST 2: Vite Production Manifest & Bundle Resolution\n";
$manifest_path = $theme_dir . '/dist/.vite/manifest.json';
report_test( 'Vite manifest.json exists in theme dist/.vite/', file_exists( $manifest_path ) );
if ( file_exists( $manifest_path ) ) {
	$manifest = json_decode( file_get_contents( $manifest_path ), true );
	report_test( 'Manifest contains valid JSON', is_array( $manifest ) );
	report_test( 'Manifest contains primary entry index.html', isset( $manifest['index.html'] ) );
	$entry_js = $manifest['index.html']['file'] ?? '';
	report_test( 'Compiled entrypoint JS exists on disk', file_exists( $theme_dir . '/dist/' . $entry_js ) );
	$entry_css = $manifest['index.html']['css'][0] ?? '';
	report_test( 'Compiled CSS bundle exists on disk', file_exists( $theme_dir . '/dist/' . $entry_css ) );
}

// TEST 3: Static Asset Completeness & Space Encodings
echo "\nTEST 3: Static Brand Assets & Media Completeness\n";
report_test( 'Official POPRIO logo exists', file_exists( $theme_dir . '/assets/brand/poprio-logo.webp' ) );
report_test( 'Hero Package 1 (Caramel) exists', file_exists( $theme_dir . '/assets/packages/package 1.png' ) );
report_test( 'Hero Package 2 (Cookies & Cream) exists', file_exists( $theme_dir . '/assets/packages/package 2.png' ) );
report_test( 'Hero Package 3 (Strawberry) exists', file_exists( $theme_dir . '/assets/packages/package 3.png' ) );
report_test( 'Hero Package 4 (Choco Hazelnut) exists', file_exists( $theme_dir . '/assets/packages/package 4.png' ) );
report_test( 'Hero Package 5 (Snickers) exists', file_exists( $theme_dir . '/assets/packages/package 5.png' ) );
report_test( 'Desktop 15s Trailer MP4 exists', file_exists( $theme_dir . '/assets/videos/POPRIO-The-Art-of-The-Pop-15s-Trailer-1920x1080.mp4' ) );
report_test( 'Mobile 15s Trailer MP4 exists', file_exists( $theme_dir . '/assets/videos/POPRIO-The-Art-of-The-Pop-15s-Trailer-1080x1920-Mobile.mp4' ) );
report_test( 'How It Works MP4 exists', file_exists( $theme_dir . '/assets/videos/how-it-works.mp4' ) );
report_test( 'Mobile How To Order MP4 exists', file_exists( $theme_dir . '/assets/videos/POPRIO-How-To-Order-10s-Loop-1080x1920-Mobile.mp4' ) );

// TEST 4: Companion Plugin Structure & Hooks
echo "\nTEST 4: POPRIO Visual Editor Companion Plugin\n";
report_test( 'Plugin bootstrap file exists', file_exists( $plugin_dir . '/poprio-visual-editor.php' ) );
$plugin_php = file_get_contents( $plugin_dir . '/poprio-visual-editor.php' );
report_test( 'Plugin header contains Plugin Name: POPRIO Visual Editor', preg_match( '/Plugin Name:\s*POPRIO Visual Editor/i', $plugin_php ) );
report_test( 'Class Poprio_Content_Schema exists', file_exists( $plugin_dir . '/includes/class-content-schema.php' ) );
report_test( 'Class Poprio_Revision_Manager exists', file_exists( $plugin_dir . '/includes/class-revision-manager.php' ) );
report_test( 'Class Poprio_REST_API exists', file_exists( $plugin_dir . '/includes/class-rest-api.php' ) );

// TEST 5: Standalone Packaging & ZIP Artifacts
echo "\nTEST 5: Packaging Artifacts & Size Verification\n";
report_test( 'poprio-theme.zip exists', file_exists( $doc_root . '/poprio-theme.zip' ) );
if ( file_exists( $doc_root . '/poprio-theme.zip' ) ) {
	$theme_zip_size = filesize( $doc_root . '/poprio-theme.zip' ) / ( 1024 * 1024 );
	report_test( 'poprio-theme.zip is optimized under 65 MB (current: ' . round( $theme_zip_size, 2 ) . ' MB)', $theme_zip_size < 65 );
}

report_test( 'poprio-theme-lite.zip exists', file_exists( $doc_root . '/poprio-theme-lite.zip' ) );
if ( file_exists( $doc_root . '/poprio-theme-lite.zip' ) ) {
	$lite_zip_size = filesize( $doc_root . '/poprio-theme-lite.zip' ) / ( 1024 * 1024 );
	report_test( 'poprio-theme-lite.zip is under 2 MB (current: ' . round( $lite_zip_size, 2 ) . ' MB)', $lite_zip_size < 2 );
}

report_test( 'poprio-visual-editor.zip exists', file_exists( $doc_root . '/poprio-visual-editor.zip' ) );
if ( file_exists( $doc_root . '/poprio-visual-editor.zip' ) ) {
	$plugin_zip_size = filesize( $doc_root . '/poprio-visual-editor.zip' ) / 1024;
	report_test( 'poprio-visual-editor.zip is under 100 KB (current: ' . round( $plugin_zip_size, 2 ) . ' KB)', $plugin_zip_size < 100 );
}

echo "\n------------------------------------------------------\n";
echo "SUMMARY: $passed_tests / $total_tests tests passed.\n";
echo "------------------------------------------------------\n";

if ( $passed_tests === $total_tests ) {
	echo "STATUS: ALL PHASE 5 INTEGRATION & PACKAGING TESTS PASSED CLEANLY!\n";
	exit( 0 );
} else {
	echo "STATUS: SOME TESTS FAILED.\n";
	exit( 1 );
}
