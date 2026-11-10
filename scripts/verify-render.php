<?php
/**
 * CLI Test for Template Rendering
 */
function test_route( $route, $expected_page ) {
	$output = shell_exec( "php " . __DIR__ . "/run-route.php $route" );

	echo "=== ROUTE: $route ===\n";
	echo "Output size: " . strlen( $output ) . " bytes\n";

	$has_root = strpos( $output, 'id="root"' ) !== false;
	$has_css = preg_match( '/dist\/assets\/index-.*\.css/', $output );
	$has_js = preg_match( '/dist\/assets\/index-.*\.js/', $output );
	$has_initial_page = strpos( $output, 'POPRIO_INITIAL_PAGE = "' . $expected_page . '"' ) !== false;
	$has_data = strpos( $output, 'POPRIO_DATA' ) !== false;
	$has_whatsapp = strpos( $output, '8801705117793' ) !== false;

	echo "Has #root: " . ( $has_root ? 'YES' : 'NO' ) . "\n";
	echo "Has CSS: " . ( $has_css ? 'YES' : 'NO' ) . "\n";
	echo "Has JS entry: " . ( $has_js ? 'YES' : 'NO' ) . "\n";
	echo "Has initial page ($expected_page): " . ( $has_initial_page ? 'YES' : 'NO' ) . "\n";
	echo "Has POPRIO_DATA: " . ( $has_data ? 'YES' : 'NO' ) . "\n";
	echo "Has WhatsApp hotline: " . ( $has_whatsapp ? 'YES' : 'NO' ) . "\n\n";

	if ( ! ( $has_root && $has_css && $has_js && $has_initial_page && $has_data && $has_whatsapp ) ) {
		echo "FAILED ASSERTION FOR ROUTE: $route\n";
		exit( 1 );
	}
}

test_route( '/', 'home' );
test_route( '/about', 'about' );
test_route( '/contact', 'contact' );

echo ">>> ALL 3 ROUTE RENDER TESTS PASSED CLEANLY! <<<\n";
