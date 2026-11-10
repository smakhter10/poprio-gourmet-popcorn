=== POPRIO Visual Editor ===
Contributors: poprio
Tags: visual-editor, custom-theme, content-management, react, rest-api
Requires at least: 6.2
Tested up to: 6.7
Requires PHP: 8.0
Stable tag: 1.0.0
License: Proprietary
License URI: https://eatpoprio.com/license

Companion visual editor backend, schema validation, and REST persistence for the POPRIO Gourmet Popcorn theme.

== Description ==

POPRIO Visual Editor is the dedicated companion plugin for the POPRIO Gourmet Popcorn WordPress theme.
It manages canonical content schemas, draft revisions, live publishing, and REST API endpoints (`/wp-json/poprio/v1/content`).

== Features ==
* Canonical JSON content schema for all 5 signature flavours and sections.
* Secure REST API endpoints for drafts, live publishing, and rollbacks.
* Rolling 10-revision history with instant restoration.
* Deep data sanitization and allowlists.
* Zero external cloud lock-in: runs directly on traditional WordPress hosting.

== Installation ==

1. Upload the `poprio-visual-editor` folder to your `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. The plugin automatically seeds the default POPRIO content into your database.

== Changelog ==

= 1.0.0 =
* Initial Phase 3 release: Content Schema, Revision Manager, and REST API controllers.

