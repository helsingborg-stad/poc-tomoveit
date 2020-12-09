<?php

/**
 * Initiate object.
 */
$ec_theme = new EC_Theme;

/**
 * Class EC_Theme
 */
class EC_Theme {

    /**
     * Theme constructor.
     */
    public function __construct(){
        add_action('wp_enqueue_scripts', [&$this, 'load_plugin_scripts']);
    }

    public function load_plugin_scripts() {
            wp_enqueue_script('theme', get_template_directory_uri() . '/dist/bundle.js', [], null, true);
    }
}
