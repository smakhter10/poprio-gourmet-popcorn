<?php
/**
 * POPRIO Content Schema & Sanitization
 *
 * Defines the canonical data contract, default values, and strict validation/sanitization
 * for all POPRIO website content.
 *
 * @package Poprio_Visual_Editor
 */

if ( ! defined( 'ABSPATH' ) && ! defined( 'POPRIO_TEST_MODE' ) ) {
	exit;
}

class Poprio_Content_Schema {

	const SCHEMA_VERSION = '1.0.0';

	/**
	 * Returns the complete canonical default schema populated with authentic POPRIO brand content.
	 *
	 * @return array
	 */
	public static function get_default_schema(): array {
		return [
			'version'     => self::SCHEMA_VERSION,
			'updated_at'  => gmdate( 'c' ),
			'meta'        => [
				'name'             => 'POPRIO',
				'tagline'          => 'Gourmet Flavoured Popcorn',
				'domain'           => 'eatpoprio.com',
				'logo'             => [
					'src'    => '/assets/brand/poprio-logo.webp',
					'alt'    => 'POPRIO Official Logo',
					'width'  => 240,
					'height' => 89,
				],
				'whatsappNumber'   => '8801705117793',
				'whatsappGreeting' => "Hi POPRIO! I'd like to know more about your popcorn flavours.",
				'socialLinks'      => [
					[ 'id' => 'facebook', 'label' => 'POPRIO on Facebook', 'url' => 'https://facebook.com' ],
					[ 'id' => 'instagram', 'label' => 'POPRIO on Instagram', 'url' => 'https://instagram.com' ],
					[ 'id' => 'youtube', 'label' => 'POPRIO on YouTube', 'url' => 'https://youtube.com' ],
				],
			],
			'hero'        => [
				'eyebrow1'     => 'Not Your Ordinary',
				'eyebrow2'     => 'Your Next Obsession?',
				'subtitle'     => 'Handcrafted in small batches with bold, crunchy flavours that turn every handful into a comic-sized flavour explosion.',
				'ctaText'      => 'Explore Flavours',
				'primaryWords' => [
					[ 'text' => 'Popcorn', 'color' => '#FFFFFF', 'pillBg' => 'var(--color-warm-cream)', 'badgeBg' => 'var(--color-red-orange)', 'strokeColor' => '#180904', 'strokeWidth' => '0.24rem' ],
					[ 'text' => 'Snack', 'color' => '#FFFFFF', 'pillBg' => 'var(--color-warm-cream)', 'badgeBg' => 'var(--color-red-orange)', 'strokeColor' => '#180904', 'strokeWidth' => '0.24rem' ],
					[ 'text' => 'Craving', 'color' => '#FFFFFF', 'pillBg' => 'var(--color-warm-cream)', 'badgeBg' => 'var(--color-red-orange)', 'strokeColor' => '#180904', 'strokeWidth' => '0.24rem' ],
					[ 'text' => 'Treat', 'color' => '#FFFFFF', 'pillBg' => 'var(--color-warm-cream)', 'badgeBg' => 'var(--color-red-orange)', 'strokeColor' => '#180904', 'strokeWidth' => '0.24rem' ],
				],
				'flavourWords' => [
					[ 'text' => 'Cookies & Cream', 'color' => '#FFFFFF', 'pillBg' => 'var(--color-accent-pink)', 'badgeBg' => 'var(--color-cocoa-brown)', 'strokeColor' => '#180904', 'strokeWidth' => '0.24rem' ],
					[ 'text' => 'Caramel', 'color' => '#FFFFFF', 'pillBg' => 'var(--color-caramel)', 'badgeBg' => 'var(--color-warm-cream)', 'strokeColor' => '#180904', 'strokeWidth' => '0.24rem' ],
					[ 'text' => 'Strawberry', 'color' => '#FFFFFF', 'pillBg' => 'var(--color-red-orange)', 'badgeBg' => 'var(--color-accent-pink)', 'strokeColor' => '#180904', 'strokeWidth' => '0.24rem' ],
					[ 'text' => 'Choco Hazelnut', 'color' => '#FFFFFF', 'pillBg' => 'var(--color-chocolate-rich)', 'badgeBg' => 'var(--color-caramel)', 'strokeColor' => '#180904', 'strokeWidth' => '0.24rem' ],
				],
				'packages'     => [
					[ 'id' => 'pkg-caramel', 'imagePath' => '/assets/packages/package 1.png', 'flavourName' => 'Caramel', 'altText' => 'POPRIO Caramel Gourmet Popcorn pouch' ],
					[ 'id' => 'pkg-cookies-cream', 'imagePath' => '/assets/packages/package 2.png', 'flavourName' => 'Cookies & Cream', 'altText' => 'POPRIO Cookies & Cream Gourmet Popcorn pouch' ],
					[ 'id' => 'pkg-strawberry', 'imagePath' => '/assets/packages/package 3.png', 'flavourName' => 'Strawberry', 'altText' => 'POPRIO Strawberry Gourmet Popcorn pouch' ],
					[ 'id' => 'pkg-nutella', 'imagePath' => '/assets/packages/package 4.png', 'flavourName' => 'Nutella Choco Hazelnut', 'altText' => 'POPRIO Nutella Choco Hazelnut Gourmet Popcorn pouch' ],
					[ 'id' => 'pkg-snickers', 'imagePath' => '/assets/packages/package 5.png', 'flavourName' => 'Snickers Inspired', 'altText' => 'POPRIO Snickers Inspired Gourmet Popcorn pouch' ],
				],
			],
			'trailer'     => [
				'videoSrc'       => '/assets/videos/POPRIO-The-Art-of-The-Pop-15s-Trailer-1920x1080.mp4',
				'videoSrcMobile' => '/assets/videos/POPRIO-The-Art-of-The-Pop-15s-Trailer-1080x1920-Mobile.mp4',
				'posterSrc'      => '',
				'badge'          => 'TRAILER',
				'heading'        => 'THE ART OF THE POP',
			],
			'flavourverse' => [
				'eyebrow'  => 'POPRIO FLAVOURVERSE',
				'title'    => 'THE FLAVOURVERSE',
				'subtitle' => 'Five bold flavours. Giant mushroom kernels. Handcrafted for maximum crunch.',
				'cards'    => [
					[
						'id'                        => 'bento-strawberry',
						'productId'                 => 'pkg-strawberry',
						'flavourNumber'             => '01',
						'label'                     => 'THE FRUITY ONE',
						'title'                     => 'STRAWBERRY',
						'description'               => 'A little sweet. A lot of pop.',
						'row'                       => 1,
						'colSpan'                   => 2,
						'layoutVariant'             => 'horizontal-feature',
						'cardBg'                    => 'var(--color-accent-pink)',
						'textColor'                 => 'var(--color-cocoa-brown)',
						'mutedTextColor'            => 'rgba(75, 31, 15, 0.86)',
						'labelColor'                => 'var(--color-red-orange)',
						'arrowBadgeBg'              => 'var(--color-warm-cream)',
						'arrowBadgeText'            => 'var(--color-cocoa-brown)',
						'stageAccentBg'             => 'var(--color-warm-cream)',
						'packageImage'              => '/assets/packages/package 3.png',
						'packageAlt'                => 'POPRIO Strawberry Gourmet Popcorn pouch',
						'entranceRotation'          => -1.75,
						'hoverCardRotation'         => -0.85,
						'basePackageRotation'       => -3.5,
						'hoverPackageRotationDelta' => -3.5,
					],
					[
						'id'                        => 'bento-caramel',
						'productId'                 => 'pkg-caramel',
						'flavourNumber'             => '02',
						'label'                     => 'THE GOLDEN ONE',
						'title'                     => 'CARAMEL',
						'description'               => 'Golden, sweet, and satisfyingly crunchy.',
						'row'                       => 1,
						'colSpan'                   => 1,
						'layoutVariant'             => 'vertical-compact',
						'cardBg'                    => 'var(--color-caramel)',
						'textColor'                 => 'var(--color-cocoa-brown)',
						'mutedTextColor'            => 'rgba(75, 31, 15, 0.88)',
						'labelColor'                => 'var(--color-warm-cream)',
						'arrowBadgeBg'              => 'var(--color-butter-yellow)',
						'arrowBadgeText'            => 'var(--color-cocoa-brown)',
						'stageAccentBg'             => 'var(--color-butter-yellow)',
						'packageImage'              => '/assets/packages/package 1.png',
						'packageAlt'                => 'POPRIO Caramel Gourmet Popcorn pouch',
						'entranceRotation'          => 1.75,
						'hoverCardRotation'         => 1.0,
						'basePackageRotation'       => 2.5,
						'hoverPackageRotationDelta' => 3.5,
					],
					[
						'id'                        => 'bento-choco-hazelnut',
						'productId'                 => 'pkg-nutella',
						'flavourNumber'             => '03',
						'label'                     => 'THE NUTTY ONE',
						'title'                     => 'CHOCO HAZELNUT',
						'description'               => 'Rich chocolate flavour with a nutty twist.',
						'row'                       => 2,
						'colSpan'                   => 1,
						'layoutVariant'             => 'vertical-compact',
						'cardBg'                    => 'var(--color-chocolate-rich)',
						'textColor'                 => 'var(--color-warm-cream)',
						'mutedTextColor'            => 'rgba(255, 243, 224, 0.88)',
						'labelColor'                => 'var(--color-butter-yellow)',
						'arrowBadgeBg'              => 'var(--color-butter-yellow)',
						'arrowBadgeText'            => 'var(--color-cocoa-brown)',
						'stageAccentBg'             => 'var(--color-cocoa-brown)',
						'packageImage'              => '/assets/packages/package 4.png',
						'packageAlt'                => 'POPRIO Choco Hazelnut Gourmet Popcorn pouch',
						'entranceRotation'          => -1.65,
						'hoverCardRotation'         => -1.0,
						'basePackageRotation'       => -2.5,
						'hoverPackageRotationDelta' => -3.5,
					],
					[
						'id'                        => 'bento-cookies-cream',
						'productId'                 => 'pkg-cookies-cream',
						'flavourNumber'             => '04',
						'label'                     => 'THE CREAMY ONE',
						'title'                     => 'COOKIES & CREAM',
						'description'               => 'Cookie crunch meets creamy goodness.',
						'row'                       => 2,
						'colSpan'                   => 2,
						'layoutVariant'             => 'horizontal-feature',
						'cardBg'                    => 'var(--color-light-cocoa)',
						'textColor'                 => 'var(--color-cocoa-brown)',
						'mutedTextColor'            => 'rgba(75, 31, 15, 0.86)',
						'labelColor'                => 'var(--color-warm-purple)',
						'arrowBadgeBg'              => 'var(--color-accent-pink)',
						'arrowBadgeText'            => 'var(--color-cocoa-brown)',
						'stageAccentBg'             => 'var(--color-warm-cream)',
						'packageImage'              => '/assets/packages/package 2.png',
						'packageAlt'                => 'POPRIO Cookies & Cream Gourmet Popcorn pouch',
						'entranceRotation'          => 1.65,
						'hoverCardRotation'         => 0.85,
						'basePackageRotation'       => 3.5,
						'hoverPackageRotationDelta' => 3.5,
					],
					[
						'id'                        => 'bento-chocolate-peanut-caramel',
						'productId'                 => 'pkg-snickers',
						'flavourNumber'             => '05',
						'label'                     => 'THE INDULGENT ONE',
						'title'                     => 'CHOCOLATE PEANUT CARAMEL',
						'description'               => 'Chocolate. Caramel. Crunch.',
						'row'                       => 3,
						'colSpan'                   => 3,
						'layoutVariant'             => 'wide-finale',
						'cardBg'                    => 'var(--color-butter-yellow)',
						'textColor'                 => 'var(--color-cocoa-brown)',
						'mutedTextColor'            => 'rgba(75, 31, 15, 0.88)',
						'labelColor'                => 'var(--color-red-orange)',
						'arrowBadgeBg'              => 'var(--color-warm-cream)',
						'arrowBadgeText'            => 'var(--color-cocoa-brown)',
						'stageAccentBg'             => 'var(--color-caramel)',
						'packageImage'              => '/assets/packages/package 5.png',
						'packageAlt'                => 'POPRIO Chocolate Peanut Caramel Gourmet Popcorn pouch',
						'entranceRotation'          => -1.25,
						'hoverCardRotation'         => -0.65,
						'basePackageRotation'       => -3.0,
						'hoverPackageRotationDelta' => -3.5,
					],
				],
				'products' => [
					[
						'id'               => 'pkg-caramel',
						'slug'             => 'caramel-popcorn',
						'title'            => 'Caramel Popcorn',
						'badge'            => 'FLAVOUR 01 · BEST SELLER',
						'accentColor'      => 'var(--color-caramel)',
						'shortDescription' => 'Air-popped mushroom kernels tumbled in slow-cooked golden caramel with rich creamery butter and a crisp, glass-like crunch in every bite.',
						'flavourNotes'     => [ 'Sweet', 'Crunchy', 'Buttery', 'Golden Glaze' ],
						'ingredients'      => [
							[ 'id' => 'ing-popcorn', 'name' => 'Mushroom Popcorn', 'icon' => 'popcorn' ],
							[ 'id' => 'ing-caramel', 'name' => 'Golden Caramel', 'icon' => 'caramel' ],
							[ 'id' => 'ing-butter', 'name' => 'Creamery Butter', 'icon' => 'butter' ],
							[ 'id' => 'ing-cream', 'name' => 'Vanilla Cream Note', 'icon' => 'cream' ],
						],
						'sizes'            => [
							[ 'id' => 'regular', 'label' => 'Regular', 'subtitle' => 'Solo snack pouch' ],
							[ 'id' => 'large', 'label' => 'Large', 'subtitle' => 'Shareable family pouch' ],
						],
						'packageImage'     => '/assets/packages/package 1.png',
						'galleryImages'    => [
							[ 'id' => 'caramel-pack', 'label' => 'Package Front', 'src' => '/assets/packages/package 1.png', 'alt' => 'POPRIO Caramel Popcorn package front', 'kind' => 'package' ],
							[ 'id' => 'caramel-cluster', 'label' => 'Caramel Cluster', 'src' => '/assets/floating-corns/Caramel Drizzled Popcorn Cluster-2.png', 'alt' => 'Caramel drizzled gourmet popcorn cluster', 'kind' => 'cluster' ],
							[ 'id' => 'caramel-golden', 'label' => 'Golden Kernel', 'src' => '/assets/floating-corns/Gourmet Golden Popcorn Cluster.png', 'alt' => 'Close-up of golden popped gourmet kernel', 'kind' => 'detail' ],
						],
						'whatsappMessage'  => "Hi POPRIO! I'd like to order Caramel Popcorn. Could you share availability and pricing?",
					],
					[
						'id'               => 'pkg-cookies-cream',
						'slug'             => 'cookies-and-cream-popcorn',
						'title'            => 'Cookies & Cream Popcorn',
						'badge'            => 'FLAVOUR 02 · FAN FAVOURITE',
						'accentColor'      => 'var(--color-accent-pink)',
						'shortDescription' => 'Crisp golden popcorn folded into velvety white cream coating and generously dusted with crushed dark cocoa sandwich cookies.',
						'flavourNotes'     => [ 'Creamy', 'Crunchy', 'Sweet', 'Cocoa Crumb' ],
						'ingredients'      => [
							[ 'id' => 'ing-popcorn', 'name' => 'Mushroom Popcorn', 'icon' => 'popcorn' ],
							[ 'id' => 'ing-cookie', 'name' => 'Dark Cookie Crumbs', 'icon' => 'cookie' ],
							[ 'id' => 'ing-cream', 'name' => 'Velvet Cream Coating', 'icon' => 'cream' ],
							[ 'id' => 'ing-butter', 'name' => 'Pure Butter', 'icon' => 'butter' ],
						],
						'sizes'            => [
							[ 'id' => 'regular', 'label' => 'Regular', 'subtitle' => 'Solo snack pouch' ],
							[ 'id' => 'large', 'label' => 'Large', 'subtitle' => 'Shareable family pouch' ],
						],
						'packageImage'     => '/assets/packages/package 2.png',
						'galleryImages'    => [
							[ 'id' => 'cookies-pack', 'label' => 'Package Front', 'src' => '/assets/packages/package 2.png', 'alt' => 'POPRIO Cookies & Cream Popcorn package front', 'kind' => 'package' ],
							[ 'id' => 'cookies-cluster', 'label' => 'Cookie Cluster', 'src' => '/assets/floating-corns/Chocolate Drizzled Cookie Popcorn Cluster-1.png', 'alt' => 'Cookies and cream drizzled popcorn cluster', 'kind' => 'cluster' ],
							[ 'id' => 'cookies-detail', 'label' => 'Cream & Cocoa', 'src' => '/assets/floating-corns/Chocolate-Drizzled Gourmet Popcorn Cluster.png', 'alt' => 'Close-up of cocoa dusted gourmet popcorn', 'kind' => 'detail' ],
						],
						'whatsappMessage'  => "Hi POPRIO! I'd like to order Cookies & Cream Popcorn. Could you share availability and pricing?",
					],
					[
						'id'               => 'pkg-strawberry',
						'slug'             => 'strawberry-popcorn',
						'title'            => 'Strawberry Popcorn',
						'badge'            => 'FLAVOUR 03 · BERRY POP',
						'accentColor'      => 'var(--color-accent-pink)',
						'shortDescription' => 'Bright, fruity strawberry glaze meets buttery caramelised crunch for a vibrant pink treat bursting with sweet berry aroma.',
						'flavourNotes'     => [ 'Fruity', 'Sweet', 'Creamy', 'Crunchy' ],
						'ingredients'      => [
							[ 'id' => 'ing-popcorn', 'name' => 'Mushroom Popcorn', 'icon' => 'popcorn' ],
							[ 'id' => 'ing-strawberry', 'name' => 'Strawberry Glaze', 'icon' => 'strawberry' ],
							[ 'id' => 'ing-cream', 'name' => 'Sweet Cream Drizzle', 'icon' => 'cream' ],
							[ 'id' => 'ing-butter', 'name' => 'Creamery Butter', 'icon' => 'butter' ],
						],
						'sizes'            => [
							[ 'id' => 'regular', 'label' => 'Regular', 'subtitle' => 'Solo snack pouch' ],
							[ 'id' => 'large', 'label' => 'Large', 'subtitle' => 'Shareable family pouch' ],
						],
						'packageImage'     => '/assets/packages/package 3.png',
						'galleryImages'    => [
							[ 'id' => 'strawberry-pack', 'label' => 'Package Front', 'src' => '/assets/packages/package 3.png', 'alt' => 'POPRIO Strawberry Popcorn package front', 'kind' => 'package' ],
							[ 'id' => 'strawberry-cluster', 'label' => 'Golden Kernel', 'src' => '/assets/floating-corns/Gourmet Golden Popcorn Cluster.png', 'alt' => 'Golden gourmet popcorn cluster base', 'kind' => 'cluster' ],
							[ 'id' => 'strawberry-glaze', 'label' => 'Glazed Crunch', 'src' => '/assets/floating-corns/Caramel Drizzled Popcorn Cluster-2.png', 'alt' => 'Glazed gourmet popcorn cluster detail', 'kind' => 'detail' ],
						],
						'whatsappMessage'  => "Hi POPRIO! I'd like to order Strawberry Popcorn. Could you share availability and pricing?",
					],
					[
						'id'               => 'pkg-nutella',
						'slug'             => 'choco-hazelnut-popcorn',
						'title'            => 'Choco Hazelnut Popcorn',
						'badge'            => 'FLAVOUR 04 · CHOCO LUXE',
						'accentColor'      => 'var(--color-light-cocoa)',
						'shortDescription' => 'Decadent roasted hazelnut and smooth milk chocolate ribbons drizzled over crisp caramelised popcorn for true choco-hazelnut lovers.',
						'flavourNotes'     => [ 'Chocolatey', 'Nutty', 'Creamy', 'Crunchy' ],
						'ingredients'      => [
							[ 'id' => 'ing-popcorn', 'name' => 'Mushroom Popcorn', 'icon' => 'popcorn' ],
							[ 'id' => 'ing-chocolate', 'name' => 'Milk Chocolate', 'icon' => 'chocolate' ],
							[ 'id' => 'ing-hazelnut', 'name' => 'Roasted Hazelnut', 'icon' => 'hazelnut' ],
							[ 'id' => 'ing-butter', 'name' => 'Creamery Butter', 'icon' => 'butter' ],
						],
						'sizes'            => [
							[ 'id' => 'regular', 'label' => 'Regular', 'subtitle' => 'Solo snack pouch' ],
							[ 'id' => 'large', 'label' => 'Large', 'subtitle' => 'Shareable family pouch' ],
						],
						'packageImage'     => '/assets/packages/package 4.png',
						'galleryImages'    => [
							[ 'id' => 'nutella-pack', 'label' => 'Package Front', 'src' => '/assets/packages/package 4.png', 'alt' => 'POPRIO Choco Hazelnut Popcorn package front', 'kind' => 'package' ],
							[ 'id' => 'nutella-cluster', 'label' => 'Choco Drizzle', 'src' => '/assets/floating-corns/Chocolate-Drizzled Gourmet Popcorn Cluster.png', 'alt' => 'Chocolate-drizzled gourmet popcorn cluster', 'kind' => 'cluster' ],
							[ 'id' => 'nutella-detail', 'label' => 'Cocoa Crunch', 'src' => '/assets/floating-corns/Chocolate Drizzled Cookie Popcorn Cluster-1.png', 'alt' => 'Rich chocolate glazed popcorn cluster', 'kind' => 'detail' ],
						],
						'whatsappMessage'  => "Hi POPRIO! I'd like to order Choco Hazelnut Popcorn. Could you share availability and pricing?",
					],
					[
						'id'               => 'pkg-snickers',
						'slug'             => 'chocolate-peanut-caramel-popcorn',
						'title'            => 'Chocolate Peanut Caramel Popcorn',
						'badge'            => 'FLAVOUR 05 · LOADED CRUNCH',
						'accentColor'      => 'var(--color-butter-yellow)',
						'shortDescription' => 'A bold collision of chewy golden caramel, roasted peanut crunch, and rich chocolate drizzle layered over giant gourmet popcorn puffs.',
						'flavourNotes'     => [ 'Nutty', 'Chocolatey', 'Sweet', 'Crunchy' ],
						'ingredients'      => [
							[ 'id' => 'ing-popcorn', 'name' => 'Mushroom Popcorn', 'icon' => 'popcorn' ],
							[ 'id' => 'ing-peanut', 'name' => 'Roasted Peanuts', 'icon' => 'peanut' ],
							[ 'id' => 'ing-caramel', 'name' => 'Golden Caramel', 'icon' => 'caramel' ],
							[ 'id' => 'ing-chocolate', 'name' => 'Chocolate Drizzle', 'icon' => 'chocolate' ],
						],
						'sizes'            => [
							[ 'id' => 'regular', 'label' => 'Regular', 'subtitle' => 'Solo snack pouch' ],
							[ 'id' => 'large', 'label' => 'Large', 'subtitle' => 'Shareable family pouch' ],
						],
						'packageImage'     => '/assets/packages/package 5.png',
						'galleryImages'    => [
							[ 'id' => 'snickers-pack', 'label' => 'Package Front', 'src' => '/assets/packages/package 5.png', 'alt' => 'POPRIO Chocolate Peanut Caramel Popcorn package front', 'kind' => 'package' ],
							[ 'id' => 'snickers-caramel', 'label' => 'Caramel Ribbon', 'src' => '/assets/floating-corns/Caramel Drizzled Popcorn Cluster-2.png', 'alt' => 'Caramel drizzled popcorn cluster', 'kind' => 'cluster' ],
							[ 'id' => 'snickers-choco', 'label' => 'Choco & Nut', 'src' => '/assets/floating-corns/Chocolate-Drizzled Gourmet Popcorn Cluster.png', 'alt' => 'Chocolate drizzled gourmet popcorn cluster', 'kind' => 'detail' ],
						],
						'whatsappMessage'  => "Hi POPRIO! I'd like to order Chocolate Peanut Caramel Popcorn. Could you share availability and pricing?",
					],
				],
			],
			'originStory'  => [
				'intro'  => [
					'eyebrow'     => 'THE ORIGIN OF THE POP',
					'heading'     => 'HOW IT ALL POPPED!',
					'description' => 'From an ordinary crunch to something extraordinary.',
					'stickerText' => 'POP!',
				],
				'scenes' => [
					[
						'sceneNumber'       => 1,
						'chapterCode'       => '01',
						'identityLabel'     => '01 / THE PROBLEM',
						'title'             => 'POPCORN WAS GETTING BORING.',
						'description'       => 'Same old snack. Same old crunch. Nothing exciting.',
						'backgroundColor'   => '#EADFCB',
						'textColor'         => '#4B1F0F',
						'mutedTextColor'    => 'rgba(75, 31, 15, 0.82)',
						'badgeBgColor'      => '#FFF3E0',
						'badgeTextColor'    => '#4B1F0F',
						'isDarkBackground'  => false,
					],
					[
						'sceneNumber'       => 2,
						'chapterCode'       => '02',
						'identityLabel'     => '02 / THE SPARK',
						'title'             => 'THEN CAME THE IDEA.',
						'description'       => 'What if popcorn could be bold, playful, and bursting with flavour?',
						'backgroundColor'   => '#FFC72C',
						'textColor'         => '#4B1F0F',
						'mutedTextColor'    => 'rgba(75, 31, 15, 0.88)',
						'badgeBgColor'      => '#FFF3E0',
						'badgeTextColor'    => '#E0351B',
						'isDarkBackground'  => false,
					],
					[
						'sceneNumber'       => 3,
						'chapterCode'       => '03',
						'identityLabel'     => '03 / THE EXPERIMENT',
						'title'             => 'WE STARTED MIXING MAGIC.',
						'description'       => 'Crunch met caramel. Cream met cookies. Flavour met fun.',
						'backgroundColor'   => '#E0351B',
						'textColor'         => '#FFF3E0',
						'mutedTextColor'    => 'rgba(255, 243, 224, 0.92)',
						'badgeBgColor'      => '#FFC72C',
						'badgeTextColor'    => '#4B1F0F',
						'isDarkBackground'  => true,
					],
					[
						'sceneNumber'       => 4,
						'chapterCode'       => '04',
						'identityLabel'     => '04 / THE REVEAL',
						'title'             => 'AND THEN... POPRIO WAS BORN.',
						'description'       => 'Bold flavours. Bright packaging. One deliciously different popcorn experience.',
						'backgroundColor'   => '#F5A7BE',
						'textColor'         => '#4B1F0F',
						'mutedTextColor'    => 'rgba(75, 31, 15, 0.88)',
						'badgeBgColor'      => '#FFC72C',
						'badgeTextColor'    => '#4B1F0F',
						'isDarkBackground'  => false,
					],
					[
						'sceneNumber'       => 5,
						'chapterCode'       => '05',
						'identityLabel'     => '05 / THE INVITATION',
						'title'             => "NOW IT'S YOUR TURN TO POP IN.",
						'description'       => 'Pick your flavour. Open the pack. Start the obsession.',
						'backgroundColor'   => '#7A3DA6',
						'textColor'         => '#FFF3E0',
						'mutedTextColor'    => 'rgba(255, 243, 224, 0.92)',
						'badgeBgColor'      => '#FFC72C',
						'badgeTextColor'    => '#4B1F0F',
						'isDarkBackground'  => true,
					],
				],
			],
			'howToOrder'   => [
				'eyebrow'         => '3-STEP CRUNCH DISPATCH',
				'title'           => 'HOW TO POP IN',
				'subtitle'        => 'Getting fresh gourmet popcorn delivered straight to your door in Dhaka is as easy as 1-2-3.',
				'videoSrc'        => '/assets/videos/how-it-works.mp4',
				'videoSrcMobile'  => '/assets/videos/POPRIO-How-To-Order-10s-Loop-1080x1920-Mobile.mp4',
				'whatsappMessage' => "Hi POPRIO! I'd like to place an order.",
				'steps'           => [
					[ 'stepNumber' => '01', 'title' => 'PICK YOUR POP', 'description' => 'Choose your favourite flavour.' ],
					[ 'stepNumber' => '02', 'title' => 'CHAT & ORDER', 'description' => 'Message us directly on WhatsApp.' ],
					[ 'stepNumber' => '03', 'title' => 'ENJOY THE CRUNCH', 'description' => 'Get ready for POPRIO!' ],
				],
			],
			'about'        => [
				'eyebrow'    => 'OUR STORY ✦ BORN IN DHAKA',
				'heading'    => "WE DIDN'T JUST MAKE POPCORN. WE STARTED A CRUNCH REVOLUTION.",
				'paragraphs' => [
					'Born in the heart of Dhaka, POPRIO started with a simple, stubborn question: why was everyone settling for lifeless, cardboard-tasting popcorn? We believed snack time deserved genuine excitement — the kind of bold, unapologetic flavour that makes you pause mid-crunch and reach straight back into the bag.',
					'Every single pouch of POPRIO is crafted in small batches using giant, cloud-like mushroom kernels popped to airy perfection. From slow-simmered golden caramel and real creamery butter to crushed dark cocoa cookies, tangy strawberry glazes, and roasted hazelnuts, we layer real, indulgent ingredients until every kernel is coated with main-character energy.',
					"Whether you're queuing up a late-night movie marathon, sharing a pouch with friends across town, or satisfying a midnight sweet-and-salty craving, POPRIO is built to bring colour, playfulness, and an unforgettable crunch to every moment. No boring kernels. No compromises. Just flavour that pops.",
				],
			],
			'contact'      => [
				'eyebrow'   => 'THE POPRIO HOTLINE ✦ DHAKA CRUNCH HQ',
				'headline'  => "LET'S TALK POPCORN!",
				'subtitle'  => 'Planning a movie night, ordering bulk party pouches, looking to stock POPRIO at your store, or just want to say hello? Drop us a Crunch Gram below!',
				'phone'     => '+880 1705-117793',
				'email'     => 'HELLO@EATPOPRIO.COM',
				'location'  => 'DHAKA, BANGLADESH',
				'hours'     => 'DAILY · 10 AM – 10 PM',
				'topics'    => [
					[ 'id' => 'party-order', 'label' => 'Party / Bulk Order', 'badgeColor' => 'var(--color-butter-yellow)' ],
					[ 'id' => 'wholesale', 'label' => 'Retail / Stockist', 'badgeColor' => 'var(--color-accent-pink)' ],
					[ 'id' => 'corporate', 'label' => 'Corporate Gifting', 'badgeColor' => 'var(--color-caramel)' ],
					[ 'id' => 'general', 'label' => 'General Say Hello', 'badgeColor' => 'var(--color-light-cocoa)' ],
				],
				'faqs'      => [
					[
						'id'          => 'faq-delivery',
						'question'    => 'HOW FAST DO YOU DELIVER ACROSS DHAKA?',
						'answer'      => 'We pop fresh daily in Dhaka! Standard orders placed via WhatsApp are dispatched within 24 hours so every pouch arrives at peak crunch.',
						'accentColor' => 'var(--color-butter-yellow)',
					],
					[
						'id'          => 'faq-bulk',
						'question'    => 'DO YOU TAKE CUSTOM PARTY, WEDDING OR CORPORATE ORDERS?',
						'answer'      => 'Absolutely! From movie nights and birthday parties to branded corporate gift boxes, we offer custom batch bundles across all 5 gourmet flavours.',
						'accentColor' => 'var(--color-accent-pink)',
					],
					[
						'id'          => 'faq-freshness',
						'question'    => 'HOW LONG DOES POPRIO STAY CRUNCHY AFTER OPENING?',
						'answer'      => 'Our heavy-duty barrier pouches lock in freshness. Once opened, seal it tight and enjoy within 5–7 days (though most pouches disappear in 10 minutes!).',
						'accentColor' => 'var(--color-light-cocoa)',
					],
					[
						'id'          => 'faq-flavours',
						'question'    => 'CAN I MIX AND MATCH ALL 5 FLAVOURS IN ONE ORDER?',
						'answer'      => 'Yes! You can mix Caramel, Cookies & Cream, Strawberry, Choco Hazelnut, and Chocolate Peanut Caramel in any combination or size when you message us.',
						'accentColor' => 'var(--color-caramel)',
					],
				],
			],
			'footer'       => [
				'statement'        => 'SMALL BATCHES ✦ BIG CRAVINGS ✦ FLAVOUR THAT POPS',
				'headline'         => 'READY TO POP IN?',
				'copy'             => 'Your next popcorn obsession is only a WhatsApp message away.',
				'ctaWhatsAppText'  => 'CHAT ON WHATSAPP',
				'ctaFlavoursText'  => 'VIEW FLAVOURS',
				'copyrightText'    => 'All rights reserved. Handcrafted with obsession in Dhaka.',
			],
		];
	}

	/**
	 * Validates and deeply sanitizes an input array against the canonical schema.
	 * Returns sanitized array or WP_Error on fatal validation failure.
	 *
	 * @param mixed $input Raw input data.
	 * @return array|WP_Error
	 */
	public static function validate_and_sanitize( $input ) {
		if ( ! is_array( $input ) ) {
			if ( class_exists( 'WP_Error' ) ) {
				return new WP_Error( 'invalid_payload', 'Payload must be a JSON object / associative array.' );
			}
			return self::get_default_schema();
		}

		$defaults = self::get_default_schema();
		$clean    = [];

		$clean['version']    = self::SCHEMA_VERSION;
		$clean['updated_at'] = gmdate( 'c' );

		// 1. Meta
		$clean['meta'] = [
			'name'             => self::sanitize_text( $input['meta']['name'] ?? $defaults['meta']['name'] ),
			'tagline'          => self::sanitize_text( $input['meta']['tagline'] ?? $defaults['meta']['tagline'] ),
			'domain'           => self::sanitize_text( $input['meta']['domain'] ?? $defaults['meta']['domain'] ),
			'logo'             => [
				'src'    => self::sanitize_url( $input['meta']['logo']['src'] ?? $defaults['meta']['logo']['src'] ),
				'alt'    => self::sanitize_text( $input['meta']['logo']['alt'] ?? $defaults['meta']['logo']['alt'] ),
				'width'  => (int) ( $input['meta']['logo']['width'] ?? $defaults['meta']['logo']['width'] ),
				'height' => (int) ( $input['meta']['logo']['height'] ?? $defaults['meta']['logo']['height'] ),
			],
			'whatsappNumber'   => preg_replace( '/[^\d]/', '', (string) ( $input['meta']['whatsappNumber'] ?? $defaults['meta']['whatsappNumber'] ) ),
			'whatsappGreeting' => self::sanitize_text( $input['meta']['whatsappGreeting'] ?? $defaults['meta']['whatsappGreeting'] ),
			'socialLinks'      => [],
		];

		$socials = $input['meta']['socialLinks'] ?? $defaults['meta']['socialLinks'];
		if ( is_array( $socials ) ) {
			foreach ( $socials as $s ) {
				if ( is_array( $s ) && ! empty( $s['id'] ) ) {
					$clean['meta']['socialLinks'][] = [
						'id'    => self::sanitize_text( $s['id'] ),
						'label' => self::sanitize_text( $s['label'] ?? '' ),
						'url'   => self::sanitize_url( $s['url'] ?? '' ),
					];
				}
			}
		}

		// 2. Hero
		$clean['hero'] = [
			'eyebrow1'     => self::sanitize_text( $input['hero']['eyebrow1'] ?? $defaults['hero']['eyebrow1'] ),
			'eyebrow2'     => self::sanitize_text( $input['hero']['eyebrow2'] ?? $defaults['hero']['eyebrow2'] ),
			'subtitle'     => self::sanitize_text( $input['hero']['subtitle'] ?? $defaults['hero']['subtitle'] ),
			'ctaText'      => self::sanitize_text( $input['hero']['ctaText'] ?? $defaults['hero']['ctaText'] ),
			'primaryWords' => [],
			'flavourWords' => [],
			'packages'     => [],
		];

		foreach ( [ 'primaryWords', 'flavourWords' ] as $wordGroup ) {
			$rawWords = $input['hero'][ $wordGroup ] ?? $defaults['hero'][ $wordGroup ];
			if ( is_array( $rawWords ) ) {
				foreach ( $rawWords as $w ) {
					if ( is_array( $w ) && ! empty( $w['text'] ) ) {
						$clean['hero'][ $wordGroup ][] = [
							'text'        => self::sanitize_text( $w['text'] ),
							'color'       => self::sanitize_color( $w['color'] ?? '#FFFFFF' ),
							'pillBg'      => self::sanitize_color( $w['pillBg'] ?? 'var(--color-warm-cream)' ),
							'badgeBg'     => self::sanitize_color( $w['badgeBg'] ?? 'var(--color-red-orange)' ),
							'strokeColor' => self::sanitize_color( $w['strokeColor'] ?? '#180904' ),
							'strokeWidth' => self::sanitize_text( $w['strokeWidth'] ?? '0.24rem' ),
						];
					}
				}
			}
		}

		$rawHeroPkgs = $input['hero']['packages'] ?? $defaults['hero']['packages'];
		if ( is_array( $rawHeroPkgs ) ) {
			foreach ( $rawHeroPkgs as $p ) {
				if ( is_array( $p ) && ! empty( $p['id'] ) ) {
					$clean['hero']['packages'][] = [
						'id'          => self::sanitize_text( $p['id'] ),
						'imagePath'   => self::sanitize_url( $p['imagePath'] ?? '' ),
						'flavourName' => self::sanitize_text( $p['flavourName'] ?? '' ),
						'altText'     => self::sanitize_text( $p['altText'] ?? '' ),
					];
				}
			}
		}

		// 3. Trailer
		$clean['trailer'] = [
			'videoSrc'       => self::sanitize_url( $input['trailer']['videoSrc'] ?? $defaults['trailer']['videoSrc'] ),
			'videoSrcMobile' => self::sanitize_url( $input['trailer']['videoSrcMobile'] ?? $defaults['trailer']['videoSrcMobile'] ),
			'posterSrc'      => self::sanitize_url( $input['trailer']['posterSrc'] ?? $defaults['trailer']['posterSrc'] ),
			'badge'          => self::sanitize_text( $input['trailer']['badge'] ?? $defaults['trailer']['badge'] ),
			'heading'        => self::sanitize_text( $input['trailer']['heading'] ?? $defaults['trailer']['heading'] ),
		];

		// 4. Flavourverse
		$clean['flavourverse'] = [
			'eyebrow'  => self::sanitize_text( $input['flavourverse']['eyebrow'] ?? $defaults['flavourverse']['eyebrow'] ),
			'title'    => self::sanitize_text( $input['flavourverse']['title'] ?? $defaults['flavourverse']['title'] ),
			'subtitle' => self::sanitize_text( $input['flavourverse']['subtitle'] ?? $defaults['flavourverse']['subtitle'] ),
			'cards'    => [],
			'products' => [],
		];

		$rawCards = $input['flavourverse']['cards'] ?? $defaults['flavourverse']['cards'];
		if ( is_array( $rawCards ) ) {
			foreach ( $rawCards as $c ) {
				if ( is_array( $c ) && ! empty( $c['id'] ) ) {
					$clean['flavourverse']['cards'][] = [
						'id'                        => self::sanitize_text( $c['id'] ),
						'productId'                 => self::sanitize_text( $c['productId'] ?? '' ),
						'flavourNumber'             => self::sanitize_text( $c['flavourNumber'] ?? '' ),
						'label'                     => self::sanitize_text( $c['label'] ?? '' ),
						'title'                     => self::sanitize_text( $c['title'] ?? '' ),
						'description'               => self::sanitize_text( $c['description'] ?? '' ),
						'row'                       => (int) ( $c['row'] ?? 1 ),
						'colSpan'                   => (int) ( $c['colSpan'] ?? 1 ),
						'layoutVariant'             => self::sanitize_text( $c['layoutVariant'] ?? 'horizontal-feature' ),
						'cardBg'                    => self::sanitize_color( $c['cardBg'] ?? '' ),
						'textColor'                 => self::sanitize_color( $c['textColor'] ?? '' ),
						'mutedTextColor'            => self::sanitize_color( $c['mutedTextColor'] ?? '' ),
						'labelColor'                => self::sanitize_color( $c['labelColor'] ?? '' ),
						'arrowBadgeBg'              => self::sanitize_color( $c['arrowBadgeBg'] ?? '' ),
						'arrowBadgeText'            => self::sanitize_color( $c['arrowBadgeText'] ?? '' ),
						'stageAccentBg'             => self::sanitize_color( $c['stageAccentBg'] ?? '' ),
						'packageImage'              => self::sanitize_url( $c['packageImage'] ?? '' ),
						'packageAlt'                => self::sanitize_text( $c['packageAlt'] ?? '' ),
						'entranceRotation'          => (float) ( $c['entranceRotation'] ?? 0 ),
						'hoverCardRotation'         => (float) ( $c['hoverCardRotation'] ?? 0 ),
						'basePackageRotation'       => (float) ( $c['basePackageRotation'] ?? 0 ),
						'hoverPackageRotationDelta' => (float) ( $c['hoverPackageRotationDelta'] ?? 0 ),
					];
				}
			}
		}

		$rawProducts = $input['flavourverse']['products'] ?? $defaults['flavourverse']['products'];
		if ( is_array( $rawProducts ) ) {
			foreach ( $rawProducts as $p ) {
				if ( is_array( $p ) && ! empty( $p['id'] ) ) {
					$prod = [
						'id'               => self::sanitize_text( $p['id'] ),
						'slug'             => self::sanitize_text( $p['slug'] ?? '' ),
						'title'            => self::sanitize_text( $p['title'] ?? '' ),
						'badge'            => self::sanitize_text( $p['badge'] ?? '' ),
						'accentColor'      => self::sanitize_color( $p['accentColor'] ?? '' ),
						'shortDescription' => self::sanitize_text( $p['shortDescription'] ?? '' ),
						'flavourNotes'     => [],
						'ingredients'      => [],
						'sizes'            => [],
						'packageImage'     => self::sanitize_url( $p['packageImage'] ?? '' ),
						'galleryImages'    => [],
						'whatsappMessage'  => self::sanitize_text( $p['whatsappMessage'] ?? '' ),
					];

					if ( ! empty( $p['flavourNotes'] ) && is_array( $p['flavourNotes'] ) ) {
						foreach ( $p['flavourNotes'] as $fn ) {
							$prod['flavourNotes'][] = self::sanitize_text( $fn );
						}
					}

					if ( ! empty( $p['ingredients'] ) && is_array( $p['ingredients'] ) ) {
						foreach ( $p['ingredients'] as $ing ) {
							if ( is_array( $ing ) && ! empty( $ing['name'] ) ) {
								$prod['ingredients'][] = [
									'id'   => self::sanitize_text( $ing['id'] ?? '' ),
									'name' => self::sanitize_text( $ing['name'] ),
									'icon' => self::sanitize_text( $ing['icon'] ?? 'popcorn' ),
								];
							}
						}
					}

					if ( ! empty( $p['sizes'] ) && is_array( $p['sizes'] ) ) {
						foreach ( $p['sizes'] as $sz ) {
							if ( is_array( $sz ) && ! empty( $sz['id'] ) ) {
								$prod['sizes'][] = [
									'id'       => self::sanitize_text( $sz['id'] ),
									'label'    => self::sanitize_text( $sz['label'] ?? '' ),
									'subtitle' => self::sanitize_text( $sz['subtitle'] ?? '' ),
								];
							}
						}
					}

					if ( ! empty( $p['galleryImages'] ) && is_array( $p['galleryImages'] ) ) {
						foreach ( $p['galleryImages'] as $gi ) {
							if ( is_array( $gi ) && ! empty( $gi['src'] ) ) {
								$prod['galleryImages'][] = [
									'id'    => self::sanitize_text( $gi['id'] ?? '' ),
									'label' => self::sanitize_text( $gi['label'] ?? '' ),
									'src'   => self::sanitize_url( $gi['src'] ),
									'alt'   => self::sanitize_text( $gi['alt'] ?? '' ),
									'kind'  => self::sanitize_text( $gi['kind'] ?? 'package' ),
								];
							}
						}
					}

					$clean['flavourverse']['products'][] = $prod;
				}
			}
		}

		// 5. Origin Story
		$clean['originStory'] = [
			'intro'  => [
				'eyebrow'     => self::sanitize_text( $input['originStory']['intro']['eyebrow'] ?? $defaults['originStory']['intro']['eyebrow'] ),
				'heading'     => self::sanitize_text( $input['originStory']['intro']['heading'] ?? $defaults['originStory']['intro']['heading'] ),
				'description' => self::sanitize_text( $input['originStory']['intro']['description'] ?? $defaults['originStory']['intro']['description'] ),
				'stickerText' => self::sanitize_text( $input['originStory']['intro']['stickerText'] ?? $defaults['originStory']['intro']['stickerText'] ),
			],
			'scenes' => [],
		];

		$rawScenes = $input['originStory']['scenes'] ?? $defaults['originStory']['scenes'];
		if ( is_array( $rawScenes ) ) {
			foreach ( $rawScenes as $sc ) {
				if ( is_array( $sc ) ) {
					$clean['originStory']['scenes'][] = [
						'sceneNumber'      => (int) ( $sc['sceneNumber'] ?? 1 ),
						'chapterCode'      => self::sanitize_text( $sc['chapterCode'] ?? '' ),
						'identityLabel'    => self::sanitize_text( $sc['identityLabel'] ?? '' ),
						'title'            => self::sanitize_text( $sc['title'] ?? '' ),
						'description'      => self::sanitize_text( $sc['description'] ?? '' ),
						'backgroundColor'  => self::sanitize_color( $sc['backgroundColor'] ?? '' ),
						'textColor'        => self::sanitize_color( $sc['textColor'] ?? '' ),
						'mutedTextColor'   => self::sanitize_color( $sc['mutedTextColor'] ?? '' ),
						'badgeBgColor'     => self::sanitize_color( $sc['badgeBgColor'] ?? '' ),
						'badgeTextColor'   => self::sanitize_color( $sc['badgeTextColor'] ?? '' ),
						'isDarkBackground' => (bool) ( $sc['isDarkBackground'] ?? false ),
					];
				}
			}
		}

		// 6. How To Order
		$clean['howToOrder'] = [
			'eyebrow'         => self::sanitize_text( $input['howToOrder']['eyebrow'] ?? $defaults['howToOrder']['eyebrow'] ),
			'title'           => self::sanitize_text( $input['howToOrder']['title'] ?? $defaults['howToOrder']['title'] ),
			'subtitle'        => self::sanitize_text( $input['howToOrder']['subtitle'] ?? $defaults['howToOrder']['subtitle'] ),
			'videoSrc'        => self::sanitize_url( $input['howToOrder']['videoSrc'] ?? $defaults['howToOrder']['videoSrc'] ),
			'videoSrcMobile'  => self::sanitize_url( $input['howToOrder']['videoSrcMobile'] ?? $defaults['howToOrder']['videoSrcMobile'] ),
			'whatsappMessage' => self::sanitize_text( $input['howToOrder']['whatsappMessage'] ?? $defaults['howToOrder']['whatsappMessage'] ),
			'steps'           => [],
		];

		$rawSteps = $input['howToOrder']['steps'] ?? $defaults['howToOrder']['steps'];
		if ( is_array( $rawSteps ) ) {
			foreach ( $rawSteps as $st ) {
				if ( is_array( $st ) && ! empty( $st['title'] ) ) {
					$clean['howToOrder']['steps'][] = [
						'stepNumber'  => self::sanitize_text( $st['stepNumber'] ?? '' ),
						'title'       => self::sanitize_text( $st['title'] ),
						'description' => self::sanitize_text( $st['description'] ?? '' ),
					];
				}
			}
		}

		// 7. About
		$clean['about'] = [
			'eyebrow'    => self::sanitize_text( $input['about']['eyebrow'] ?? $defaults['about']['eyebrow'] ),
			'heading'    => self::sanitize_text( $input['about']['heading'] ?? $defaults['about']['heading'] ),
			'paragraphs' => [],
		];

		$rawParas = $input['about']['paragraphs'] ?? $defaults['about']['paragraphs'];
		if ( is_array( $rawParas ) ) {
			foreach ( $rawParas as $p ) {
				if ( is_string( $p ) && trim( $p ) !== '' ) {
					$clean['about']['paragraphs'][] = self::sanitize_text( $p );
				}
			}
		}

		// 8. Contact
		$clean['contact'] = [
			'eyebrow'  => self::sanitize_text( $input['contact']['eyebrow'] ?? $defaults['contact']['eyebrow'] ),
			'headline' => self::sanitize_text( $input['contact']['headline'] ?? $defaults['contact']['headline'] ),
			'subtitle' => self::sanitize_text( $input['contact']['subtitle'] ?? $defaults['contact']['subtitle'] ),
			'phone'    => self::sanitize_text( $input['contact']['phone'] ?? $defaults['contact']['phone'] ),
			'email'    => self::sanitize_text( $input['contact']['email'] ?? $defaults['contact']['email'] ),
			'location' => self::sanitize_text( $input['contact']['location'] ?? $defaults['contact']['location'] ),
			'hours'    => self::sanitize_text( $input['contact']['hours'] ?? $defaults['contact']['hours'] ),
			'topics'   => [],
			'faqs'     => [],
		];

		$rawTopics = $input['contact']['topics'] ?? $defaults['contact']['topics'];
		if ( is_array( $rawTopics ) ) {
			foreach ( $rawTopics as $tp ) {
				if ( is_array( $tp ) && ! empty( $tp['id'] ) ) {
					$clean['contact']['topics'][] = [
						'id'         => self::sanitize_text( $tp['id'] ),
						'label'      => self::sanitize_text( $tp['label'] ?? '' ),
						'badgeColor' => self::sanitize_color( $tp['badgeColor'] ?? '' ),
					];
				}
			}
		}

		$rawFaqs = $input['contact']['faqs'] ?? $defaults['contact']['faqs'];
		if ( is_array( $rawFaqs ) ) {
			foreach ( $rawFaqs as $fq ) {
				if ( is_array( $fq ) && ! empty( $fq['id'] ) ) {
					$clean['contact']['faqs'][] = [
						'id'          => self::sanitize_text( $fq['id'] ),
						'question'    => self::sanitize_text( $fq['question'] ?? '' ),
						'answer'      => self::sanitize_text( $fq['answer'] ?? '' ),
						'accentColor' => self::sanitize_color( $fq['accentColor'] ?? '' ),
					];
				}
			}
		}

		// 9. Footer
		$clean['footer'] = [
			'statement'       => self::sanitize_text( $input['footer']['statement'] ?? $defaults['footer']['statement'] ),
			'headline'        => self::sanitize_text( $input['footer']['headline'] ?? $defaults['footer']['headline'] ),
			'copy'            => self::sanitize_text( $input['footer']['copy'] ?? $defaults['footer']['copy'] ),
			'ctaWhatsAppText' => self::sanitize_text( $input['footer']['ctaWhatsAppText'] ?? $defaults['footer']['ctaWhatsAppText'] ),
			'ctaFlavoursText' => self::sanitize_text( $input['footer']['ctaFlavoursText'] ?? $defaults['footer']['ctaFlavoursText'] ),
			'copyrightText'   => self::sanitize_text( $input['footer']['copyrightText'] ?? $defaults['footer']['copyrightText'] ),
		];

		return $clean;
	}

	/**
	 * Sanitizes a string using WordPress function if available, or strips tags safely.
	 *
	 * @param mixed $value
	 * @return string
	 */
	public static function sanitize_text( $value ): string {
		$str = is_string( $value ) ? $value : (string) $value;
		if ( function_exists( 'sanitize_text_field' ) ) {
			return sanitize_text_field( $str );
		}
		return trim( strip_tags( $str ) );
	}

	/**
	 * Sanitizes a URL, allowing relative paths (e.g. /assets/...) and external http/https.
	 *
	 * @param mixed $value
	 * @return string
	 */
	public static function sanitize_url( $value ): string {
		$str = trim( (string) $value );
		if ( '' === $str ) {
			return '';
		}

		// Allow valid relative paths starting with /
		if ( str_starts_with( $str, '/' ) ) {
			return preg_replace( '/[<>"\'\s]/', '', $str );
		}

		if ( function_exists( 'esc_url_raw' ) ) {
			return esc_url_raw( $str );
		}

		return filter_var( $str, FILTER_VALIDATE_URL ) ? $str : '';
	}

	/**
	 * Sanitizes a color value (supports hex #RGB/#RRGGBB, CSS vars var(--...), rgb/rgba, transparent).
	 *
	 * @param mixed $value
	 * @return string
	 */
	public static function sanitize_color( $value ): string {
		$color = trim( (string) $value );
		if ( '' === $color ) {
			return '';
		}

		// Hex color #fff or #ffffff
		if ( preg_match( '/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/', $color ) ) {
			return $color;
		}

		// CSS custom properties like var(--color-caramel)
		if ( preg_match( '/^var\(--[a-zA-Z0-9_-]+\)$/', $color ) ) {
			return $color;
		}

		// rgba/rgb notation
		if ( preg_match( '/^rgba?\(\s*[\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+\s*(?:,\s*[\d\.]+\s*)?\)$/i', $color ) ) {
			return $color;
		}

		// Named transparent or inherit
		if ( in_array( strtolower( $color ), [ 'transparent', 'inherit', 'currentcolor' ], true ) ) {
			return strtolower( $color );
		}

		return sanitize_text_field( $color );
	}
}
