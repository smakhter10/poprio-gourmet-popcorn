<?php
/**
 * Front Page Template for POPRIO Theme
 *
 * Mounts the main React application into #root.
 *
 * @package PoprioTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<!-- React Mount Target Container -->
<div id="root">
	<noscript>
		<div style="background-color: #FFC72C; color: #4B1F0F; padding: 2rem; font-family: sans-serif; text-align: center;">
			<h1>POPRIO — Gourmet Popcorn</h1>
			<p>Dhaka's premium gourmet popcorn brand. Handcrafted with real butter, imported mushroom kernels, and explosive flavours.</p>
			<p>Please enable JavaScript to experience the full interactive comic-book website, or order directly via WhatsApp at +880 1705-117793.</p>
		</div>
	</noscript>
</div>

<?php
get_footer();
