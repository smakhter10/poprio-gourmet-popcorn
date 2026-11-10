<?php
/**
 * Template Tags & Default Content Helpers for POPRIO Theme
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
 * Return default brand content matching the original POPRIO design and copy.
 *
 * @return array Default content schema.
 */
function poprio_get_default_content(): array {
	$theme_uri = get_template_directory_uri();

	return array(
		'version' => '1.0.0',
		'site'    => array(
			'name'        => 'POPRIO',
			'tagline'     => 'Gourmet Popcorn',
			'domain'      => 'eatpoprio.com',
			'logo'        => array(
				'src'    => $theme_uri . '/assets/brand/poprio-logo.webp',
				'alt'    => 'POPRIO Official Logo',
				'width'  => 240,
				'height' => 89,
			),
			'whatsapp'    => array(
				'number'   => '8801705117793',
				'greeting' => "Hi POPRIO! I'd like to know more about your popcorn flavours.",
			),
			'socialLinks' => array(
				array(
					'id'    => 'facebook',
					'label' => 'POPRIO on Facebook',
					'url'   => 'https://facebook.com',
				),
				array(
					'id'    => 'instagram',
					'label' => 'POPRIO on Instagram',
					'url'   => 'https://instagram.com',
				),
				array(
					'id'    => 'youtube',
					'label' => 'POPRIO on YouTube',
					'url'   => 'https://youtube.com',
				),
			),
		),
		'hero'    => array(
			'eyebrow'       => "DHAKA'S PREMIUM GOURMET POPCORN",
			'rotatingWords' => array(
				'GOURMET POPCORN',
				'CRAZY CRUNCH',
				'BOLD FLAVOURS',
				'EXPLOSIVE POP',
			),
			'description'   => 'Handcrafted in Dhaka with real butter, imported kernels, and bold flavours. The ultimate gourmet snack experience.',
			'ctaLabel'      => 'ORDER VIA WHATSAPP',
		),
		'video'   => array(
			'desktopSrc' => $theme_uri . '/assets/videos/POPRIO-The-Art-of-The-Pop-15s-Trailer-1920x1080.mp4',
			'mobileSrc'  => $theme_uri . '/assets/videos/POPRIO-The-Art-of-The-Pop-15s-Trailer-1080x1920-Mobile.mp4',
			'posterSrc'  => $theme_uri . '/assets/brand/poprio-logo.webp',
		),
		'footer'  => array(
			'ctaHeading'    => 'READY TO POP?',
			'ctaSubheading' => 'Order fresh gourmet popcorn right now on WhatsApp.',
			'copyright'     => '© ' . gmdate( 'Y' ) . ' POPRIO. All rights reserved. Handcrafted in Dhaka, Bangladesh.',
		),
	);
}
