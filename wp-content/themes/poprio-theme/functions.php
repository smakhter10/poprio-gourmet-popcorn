<?php
/**
 * POPRIO Theme Bootstrap & Setup
 *
 * @package PoprioTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'POPRIO_THEME_VERSION', '1.0.0' );
define( 'POPRIO_THEME_DIR', get_template_directory() );
define( 'POPRIO_THEME_URI', get_template_directory_uri() );

// Require theme includes
require_once POPRIO_THEME_DIR . '/inc/asset-manifest.php';
require_once POPRIO_THEME_DIR . '/inc/template-tags.php';

/**
 * Setup theme features and supports.
 */
function poprio_theme_setup() {
	// Add title tag support
	add_theme_support( 'title-tag' );

	// Add post thumbnail support
	add_theme_support( 'post-thumbnails' );

	// Add support for HTML5 markup
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Register navigation menus
	register_nav_menus(
		array(
			'primary' => __( 'Primary Navigation', 'poprio' ),
			'footer'  => __( 'Footer Navigation', 'poprio' ),
		)
	);
}
add_action( 'after_setup_theme', 'poprio_theme_setup' );

/**
 * Enqueue Google Fonts preconnect and font stylesheet.
 */
function poprio_enqueue_fonts() {
	wp_enqueue_style(
		'poprio-google-fonts',
		'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Bangers&family=Nunito+Sans:ital,opsz,wght@0,6..12,400..900;1,6..12,400..900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=Titan+One&display=swap',
		array(),
		null
	);
}
add_action( 'wp_enqueue_scripts', 'poprio_enqueue_fonts', 5 );

/**
 * Enqueue compiled React/Vite assets.
 */
function poprio_enqueue_frontend_assets() {
	$theme_uri = get_template_directory_uri();

	// In development mode with local Vite server running
	if ( Poprio_Asset_Manifest::is_dev_server_active() ) {
		// Vite client for HMR
		wp_enqueue_script(
			'poprio-vite-client',
			Poprio_Asset_Manifest::DEV_SERVER_URL . '/@vite/client',
			array(),
			null,
			false
		);
		// Main TSX entrypoint
		wp_enqueue_script(
			'poprio-frontend',
			Poprio_Asset_Manifest::DEV_SERVER_URL . '/src/main.tsx',
			array( 'poprio-vite-client' ),
			null,
			true
		);
	} else {
		// Production manifest resolution
		$assets = Poprio_Asset_Manifest::get_entry_assets();

		// Enqueue stylesheets
		if ( ! empty( $assets['css'] ) ) {
			foreach ( $assets['css'] as $idx => $css_url ) {
				wp_enqueue_style(
					'poprio-frontend-' . $idx,
					$css_url,
					array(),
					POPRIO_THEME_VERSION
				);
			}
		}

		// Enqueue primary entrypoint script
		if ( ! empty( $assets['entry'] ) ) {
			wp_enqueue_script(
				'poprio-frontend',
				$assets['entry'],
				array(),
				POPRIO_THEME_VERSION,
				true
			);
		}

		// Preload imported chunk modules for fast parallel loading
		if ( ! empty( $assets['imports'] ) ) {
			add_action(
				'wp_head',
				function() use ( $assets ) {
					foreach ( $assets['imports'] as $chunk_url ) {
						echo '<link rel="modulepreload" href="' . esc_url( $chunk_url ) . '">' . "\n";
					}
				},
				2
			);
		}
	}

	// Determine initial page view based on active WordPress template/query
	$initial_page = 'home';
	if ( is_page( 'about' ) || is_page_template( 'page-about.php' ) || get_query_var( 'poprio_page' ) === 'about' ) {
		$initial_page = 'about';
	} elseif ( is_page( 'contact' ) || is_page_template( 'page-contact.php' ) || get_query_var( 'poprio_page' ) === 'contact' ) {
		$initial_page = 'contact';
	}

	// Prepare data payload for React hydration
	$published_data = poprio_get_published_content();
	$runtime_config = array(
		'themeUri'       => $theme_uri,
		'assetsBaseUrl'  => $theme_uri . '/assets',
		'siteUrl'        => home_url(),
		'initialPage'    => $initial_page,
		'wpNonce'        => wp_create_nonce( 'wp_rest' ),
		'restUrl'        => esc_url_raw( rest_url( 'poprio/v1' ) ),
		'isAdmin'        => is_user_logged_in() && current_user_can( 'edit_pages' ),
		'published'      => $published_data,
	);

	// Inject runtime config directly into head before main script executes
	$inline_js = 'window.POPRIO_DATA = ' . wp_json_encode( $runtime_config ) . ';';
	$inline_js .= 'window.POPRIO_THEME_URI = ' . wp_json_encode( $theme_uri ) . ';';
	$inline_js .= 'window.POPRIO_INITIAL_PAGE = ' . wp_json_encode( $initial_page ) . ';';

	wp_add_inline_script( 'poprio-frontend', $inline_js, 'before' );
}
add_action( 'wp_enqueue_scripts', 'poprio_enqueue_frontend_assets', 10 );

/**
 * Filter script tags to add type="module" for Vite ES module scripts.
 *
 * @param string $tag    Script HTML tag.
 * @param string $handle Script handle.
 * @param string $src    Script source URL.
 * @return string Modified script tag.
 */
function poprio_filter_script_type_module( $tag, $handle, $src ) {
	if ( str_starts_with( $handle, 'poprio-frontend' ) || str_starts_with( $handle, 'poprio-chunk-' ) || 'poprio-vite-client' === $handle ) {
		return '<script type="module" src="' . esc_url( $src ) . '"></script>' . "\n";
	}
	return $tag;
}
add_filter( 'script_loader_tag', 'poprio_filter_script_type_module', 10, 3 );
