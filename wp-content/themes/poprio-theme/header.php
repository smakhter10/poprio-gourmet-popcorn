<?php
/**
 * The header template for POPRIO Theme
 *
 * @package PoprioTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#FFC72C" />
	<link rel="icon" type="image/webp" href="<?php echo esc_url( get_template_directory_uri() . '/assets/brand/poprio-logo.webp' ); ?>" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'm-0 p-0 font-body overflow-x-hidden' ); ?>>
<?php wp_body_open(); ?>
