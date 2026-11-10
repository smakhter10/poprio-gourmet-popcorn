<?php
/**
 * Test Suite for Phase 3: POPRIO Content Schema & Persistence
 *
 * Verifies:
 * 1. Poprio_Content_Schema structure and defaults
 * 2. Strict sanitization and validation
 * 3. Poprio_Revision_Manager storage, draft, publish, and rolling history
 * 4. Poprio_REST_API endpoint handling and permissions
 */

define( 'POPRIO_TEST_MODE', true );

// Mock WordPress environment functions
$GLOBALS['mock_options'] = [];
$GLOBALS['mock_current_user'] = [
    'id' => 1,
    'login' => 'admin',
    'display_name' => 'Antigravity Architect',
    'caps' => [ 'edit_pages' => true, 'publish_pages' => true ],
];

function get_option( $name, $default = false ) {
    return $GLOBALS['mock_options'][ $name ] ?? $default;
}

function update_option( $name, $value, $autoload = null ) {
    $GLOBALS['mock_options'][ $name ] = $value;
    return true;
}

function delete_option( $name ) {
    unset( $GLOBALS['mock_options'][ $name ] );
    return true;
}

function sanitize_text_field( $str ) {
    return trim( strip_tags( (string) $str ) );
}

function sanitize_key( $key ) {
    return preg_replace( '/[^a-z0-9_\-]/i', '', (string) $key );
}

function esc_html( $str ) {
    return htmlspecialchars( (string) $str, ENT_QUOTES, 'UTF-8' );
}

function esc_url_raw( $url ) {
    return filter_var( (string) $url, FILTER_SANITIZE_URL ) ?: '';
}

function is_user_logged_in() {
    return ! empty( $GLOBALS['mock_current_user']['id'] );
}

function get_current_user_id() {
    return $GLOBALS['mock_current_user']['id'] ?? 0;
}

function current_user_can( $cap ) {
    return ! empty( $GLOBALS['mock_current_user']['caps'][ $cap ] );
}

function get_userdata( $user_id ) {
    if ( $user_id === 1 ) {
        return (object) [
            'ID' => 1,
            'user_login' => 'admin',
            'display_name' => 'Antigravity Architect',
        ];
    }
    return false;
}

function rest_authorization_required_code() {
    return 401;
}

function __( $text, $domain = 'default' ) {
    return $text;
}

class WP_Error {
    public $code;
    public $message;
    public $data;
    public function __construct( $code, $message, $data = [] ) {
        $this->code = $code;
        $this->message = $message;
        $this->data = $data;
    }
}

function is_wp_error( $thing ) {
    return $thing instanceof WP_Error;
}

class WP_REST_Server {
    const READABLE = 'GET';
    const CREATABLE = 'POST';
}

class WP_REST_Request {
    private $params = [];
    public function __construct( array $params = [] ) {
        $this->params = $params;
    }
    public function get_json_params() {
        return $this->params;
    }
}

class WP_REST_Response {
    public $data;
    public $status;
    public function __construct( $data, $status = 200 ) {
        $this->data = $data;
        $this->status = $status;
    }
}

// Load plugin classes
require_once __DIR__ . '/../wp-content/plugins/poprio-visual-editor/includes/class-content-schema.php';
require_once __DIR__ . '/../wp-content/plugins/poprio-visual-editor/includes/class-revision-manager.php';
require_once __DIR__ . '/../wp-content/plugins/poprio-visual-editor/includes/class-rest-api.php';

$tests_passed = 0;
$tests_total = 0;

function assert_true( $condition, $message ) {
    global $tests_passed, $tests_total;
    $tests_total++;
    if ( $condition ) {
        echo "  [PASS] {$message}\n";
        $tests_passed++;
    } else {
        echo "  [FAIL] {$message}\n";
    }
}

echo "======================================================\n";
echo "POPRIO Phase 3 Verification Test Suite\n";
echo "======================================================\n\n";

// TEST 1: Default Schema
echo "TEST 1: Canonical Schema Structure & Default Integrity\n";
$default = Poprio_Content_Schema::get_default_schema();
assert_true( is_array( $default ), 'Default schema is an array' );
assert_true( $default['version'] === '1.0.0', 'Schema version is 1.0.0' );
assert_true( isset( $default['meta'], $default['hero'], $default['trailer'], $default['flavourverse'], $default['originStory'], $default['howToOrder'], $default['about'], $default['contact'], $default['footer'] ), 'All 9 core section keys present' );

// Check authentic brand products
assert_true( count( $default['flavourverse']['products'] ) === 5, 'Exactly 5 authentic products present in flavourverse' );
assert_true( count( $default['flavourverse']['cards'] ) === 5, 'Exactly 5 bento cards present in flavourverse' );
assert_true( count( $default['hero']['packages'] ) === 5, 'Exactly 5 packages present in hero fan' );
assert_true( count( $default['originStory']['scenes'] ) === 5, 'Exactly 5 scenes present in origin story' );

$product_ids = array_column( $default['flavourverse']['products'], 'id' );
assert_true( in_array( 'pkg-caramel', $product_ids ) && in_array( 'pkg-cookies-cream', $product_ids ) && in_array( 'pkg-strawberry', $product_ids ) && in_array( 'pkg-nutella', $product_ids ) && in_array( 'pkg-snickers', $product_ids ), 'All 5 signature flavour IDs match canonical keys' );

// TEST 2: Validation & Sanitization
echo "\nTEST 2: Validation & Strict Sanitization\n";
$dirty_input = [
    'hero' => [
        'eyebrow1' => '<script>alert("xss")</script>Hello Clean World',
        'primaryWords' => [
            [ 'text' => '<b>Popcorn</b>', 'color' => '#FF0000', 'pillBg' => 'var(--color-caramel)' ],
        ],
    ],
    'meta' => [
        'whatsappNumber' => '+880-1705-117793 (official)',
    ],
];
$clean = Poprio_Content_Schema::validate_and_sanitize( $dirty_input );
assert_true( is_array( $clean ), 'Sanitized output is array' );
assert_true( strpos( $clean['hero']['eyebrow1'], '<script>' ) === false, 'XSS script tags stripped from text' );
assert_true( $clean['meta']['whatsappNumber'] === '8801705117793', 'WhatsApp number sanitized to digits only' );
assert_true( $clean['hero']['primaryWords'][0]['text'] === 'Popcorn', 'HTML stripped from rotating word text' );

// TEST 3: Revision Manager - Drafts & Publishing
echo "\nTEST 3: Revision Manager - Drafts, Publishing & Rolling History\n";
// Initial get_published should auto-seed
$published1 = Poprio_Revision_Manager::get_published();
assert_true( ! empty( $published1 ), 'Initial get_published returns seeded schema' );
assert_true( Poprio_Revision_Manager::get_draft() === null, 'Initially no draft exists' );

// Save draft
$draft_payload = $published1;
$draft_payload['hero']['subtitle'] = 'Draft custom subtitle testing';
$saved_draft = Poprio_Revision_Manager::save_draft( $draft_payload );
assert_true( is_array( $saved_draft ) && $saved_draft['is_draft'] === true, 'Draft saved with is_draft flag' );
assert_true( Poprio_Revision_Manager::get_draft()['hero']['subtitle'] === 'Draft custom subtitle testing', 'Draft accurately stored in option' );
assert_true( Poprio_Revision_Manager::get_published()['hero']['subtitle'] !== 'Draft custom subtitle testing', 'Published content remains untouched while draft is active' );

// Publish draft
$published2 = Poprio_Revision_Manager::publish( $saved_draft, 'Published first edit', 1 );
assert_true( $published2['hero']['subtitle'] === 'Draft custom subtitle testing', 'Published version updated with draft changes' );
assert_true( Poprio_Revision_Manager::get_draft() === null, 'Pending draft cleared after publishing' );

$revisions = Poprio_Revision_Manager::get_revisions();
assert_true( count( $revisions ) === 1, 'Revision history contains 1 snapshot' );
assert_true( $revisions[0]['author_name'] === 'Antigravity Architect', 'Revision author correctly recorded' );

// TEST 4: Revision History Rolling Limit (10 max)
echo "\nTEST 4: Rolling History Maximum 10 Revisions\n";
for ( $i = 1; $i <= 15; $i++ ) {
    $temp_content = $published2;
    $temp_content['hero']['subtitle'] = "Iteration {$i}";
    Poprio_Revision_Manager::publish( $temp_content, "Revision batch {$i}", 1 );
}
$revisions_overflow = Poprio_Revision_Manager::get_revisions();
assert_true( count( $revisions_overflow ) === 10, 'Revision count capped strictly at 10 items' );

// Restore a revision
$target_rev_id = $revisions_overflow[5]['id'];
$restored = Poprio_Revision_Manager::restore_revision( $target_rev_id, 1 );
assert_true( is_array( $restored ), 'Revision restored successfully' );

// Reset back to defaults
$reset_result = Poprio_Revision_Manager::reset( 'defaults', 1 );
assert_true( $reset_result['version'] === '1.0.0', 'Reset to defaults restored factory schema' );

// TEST 5: REST API Controller Simulation
echo "\nTEST 5: REST API Endpoints & Permission Enforcement\n";
// Public GET /content
$req_get = new WP_REST_Request();
$res_get = Poprio_REST_API::handle_get_content( $req_get );
assert_true( $res_get->status === 200, 'GET /content returns 200' );
assert_true( isset( $res_get->data['published'] ), 'GET /content includes published data' );
assert_true( $res_get->data['can_edit'] === true, 'Admin request identifies can_edit capability' );

// POST /content/draft with edit permissions
$req_draft = new WP_REST_Request( [
    'content' => $reset_result,
] );
$res_draft = Poprio_REST_API::handle_save_draft( $req_draft );
assert_true( $res_draft->status === 200, 'POST /content/draft returns 200' );

// Unauthorized test
$GLOBALS['mock_current_user']['caps'] = [];
$perm_edit = Poprio_REST_API::check_edit_permission();
assert_true( is_wp_error( $perm_edit ), 'Non-editor blocked from drafting (401/403)' );

$perm_pub = Poprio_REST_API::check_publish_permission();
assert_true( is_wp_error( $perm_pub ), 'Non-publisher blocked from publishing' );

// Restore admin caps
$GLOBALS['mock_current_user']['caps'] = [ 'edit_pages' => true, 'publish_pages' => true ];

echo "\n------------------------------------------------------\n";
echo "SUMMARY: {$tests_passed} / {$tests_total} tests passed.\n";
echo "------------------------------------------------------\n";

if ( $tests_passed === $tests_total ) {
    echo "STATUS: ALL PHASE 3 BACKEND & SCHEMA TESTS PASSED SUCCESSFULLY!\n";
    exit( 0 );
} else {
    echo "STATUS: SOME TESTS FAILED.\n";
    exit( 1 );
}
