<?php
/**
 * Vite Asset Manifest Loader for POPRIO Theme
 *
 * Reads Vite's manifest.json to locate hashed production assets
 * or resolves local Vite dev-server URLs during active development.
 *
 * @package PoprioTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Poprio_Asset_Manifest {

	/**
	 * Vite Dev Server default URL.
	 */
	const DEV_SERVER_URL = 'http://localhost:3000';

	/**
	 * Cached manifest data.
	 *
	 * @var array|null
	 */
	private static $manifest = null;

	/**
	 * Determine if Vite dev server is running and active.
	 *
	 * @return bool
	 */
	public static function is_dev_server_active(): bool {
		if ( defined( 'POPRIO_DEV_MODE' ) && POPRIO_DEV_MODE ) {
			return true;
		}

		// Only check in local/development environments
		if ( function_exists( 'wp_get_environment_type' ) && wp_get_environment_type() !== 'development' ) {
			return false;
		}

		// Fast ping to dev server
		$transient_key = 'poprio_vite_dev_server_active';
		$is_active     = get_transient( $transient_key );

		if ( false === $is_active ) {
			$response  = wp_remote_get(
				self::DEV_SERVER_URL,
				array(
					'timeout' => 0.5,
				)
			);
			$is_active = ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) ? 'yes' : 'no';
			set_transient( $transient_key, $is_active, 5 ); // Cache result for 5 seconds
		}

		return 'yes' === $is_active;
	}

	/**
	 * Load and cache manifest.json from theme dist.
	 *
	 * @return array
	 */
	public static function get_manifest(): array {
		if ( null !== self::$manifest ) {
			return self::$manifest;
		}

		$manifest_path = get_template_directory() . '/dist/.vite/manifest.json';
		if ( ! file_exists( $manifest_path ) ) {
			$manifest_path = get_template_directory() . '/dist/manifest.json';
		}

		if ( file_exists( $manifest_path ) ) {
			$contents = file_get_contents( $manifest_path );
			$decoded  = json_decode( $contents, true );
			if ( is_array( $decoded ) ) {
				self::$manifest = $decoded;
				return self::$manifest;
			}
		}

		self::$manifest = array();
		return self::$manifest;
	}

	/**
	 * Retrieve production asset details for the primary entrypoint.
	 *
	 * @param string $entry Optional preferred entry key.
	 * @return array With keys 'entry' (main JS URL), 'imports' (chunk URLs), and 'css' (stylesheet URLs).
	 */
	public static function get_entry_assets( string $entry = 'index.html' ): array {
		$theme_uri = get_template_directory_uri();
		$manifest  = self::get_manifest();

		$entry_script = '';
		$imports      = array();
		$styles       = array();

		// Locate primary entrypoint in manifest
		$item = null;
		if ( isset( $manifest[ $entry ] ) ) {
			$item = $manifest[ $entry ];
		} elseif ( isset( $manifest['src/main.tsx'] ) ) {
			$item = $manifest['src/main.tsx'];
		} else {
			// Find first entry marked with isEntry === true
			foreach ( $manifest as $candidate ) {
				if ( ! empty( $candidate['isEntry'] ) ) {
					$item = $candidate;
					break;
				}
			}
		}

		if ( $item ) {
			if ( ! empty( $item['file'] ) ) {
				$entry_script = $theme_uri . '/dist/' . $item['file'];
			}

			if ( ! empty( $item['css'] ) && is_array( $item['css'] ) ) {
				foreach ( $item['css'] as $css_file ) {
					$styles[] = $theme_uri . '/dist/' . $css_file;
				}
			}

			if ( ! empty( $item['imports'] ) && is_array( $item['imports'] ) ) {
				foreach ( $item['imports'] as $import_key ) {
					if ( isset( $manifest[ $import_key ]['file'] ) ) {
						$imports[] = $theme_uri . '/dist/' . $manifest[ $import_key ]['file'];
					}
					if ( ! empty( $manifest[ $import_key ]['css'] ) && is_array( $manifest[ $import_key ]['css'] ) ) {
						foreach ( $manifest[ $import_key ]['css'] as $css_file ) {
							$styles[] = $theme_uri . '/dist/' . $css_file;
						}
					}
				}
			}
		}

		// Fallback glob if manifest is missing
		if ( empty( $entry_script ) ) {
			$dist_dir = get_template_directory() . '/dist/assets';
			if ( is_dir( $dist_dir ) ) {
				$js_files  = glob( $dist_dir . '/index-*.js' );
				$css_files = glob( $dist_dir . '/index-*.css' );

				if ( ! empty( $js_files ) ) {
					$entry_script = $theme_uri . '/dist/assets/' . basename( $js_files[0] );
				}
				if ( ! empty( $css_files ) ) {
					foreach ( $css_files as $f ) {
						$styles[] = $theme_uri . '/dist/assets/' . basename( $f );
					}
				}
			}
		}

		return array(
			'entry'   => $entry_script,
			'imports' => array_unique( $imports ),
			'css'     => array_unique( $styles ),
		);
	}
}
