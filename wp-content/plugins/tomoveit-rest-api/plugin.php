<?php

/*
    Plugin Name: Tomoveit restapi
    Plugin URI: https://ecsolutions.se
    Description: Ett plugin för restapi till tomoveit.
    Version: 1.0
    Author: EC Solutions AB
    Author URI: http://ecsolutions.se
    Author Email: application@ecsolutions.se
    Text Domain: tomoveitrestapi
    Domain Path: /languages
*/

if (!defined('ABSPATH')){
    die('Silence is golden.');
}

/**
 * Class ECCVDatabase
 */
class TomoveitRestApi {

    /**
     * The plugin directory URL.
     * @var string
     */
    protected $plugin_url = '';

    /**
     * Text domain for localization.
     * @var string
     */
    protected $text_domain = 'tomoveitrestapi';



    /**
     * ECCVDatabase constructor.
     */
    public function __construct() {
        require_once('rest-api.php');
        $rest_api = new TomoveitRestApi_Routes();
        add_action('rest_api_init', [&$rest_api, 'register_routes']);
    }
}

global $TomoveitRestApi;
$TomoveitRestApi = new TomoveitRestApi;
