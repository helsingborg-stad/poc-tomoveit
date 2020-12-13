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
        // Add actions:
        add_action('wp_enqueue_scripts', [&$this, 'load_plugin_scripts']);
        add_action('output_spritemaps', [&$this, 'output_plugin_spritemap']);
        add_action('init', [&$this, 'register_post_types']);
    }

    public function load_plugin_scripts() {
            wp_enqueue_script('theme', get_template_directory_uri() . '/dist/bundle.js', [], null, true);
    }

    public function output_plugin_spritemap() {
        include_once('dist/spritemap.svg');
    }

    public function register_post_types(){
        $taxonomies = [  ];

        foreach ($taxonomies as $name => $values) {
            register_taxonomy($name, $values['post_types'], $values['options']);
        }


        $post_types = [
            'activities' => [
                'labels' => [
                    'name'               => _x('Aktiviteter', 'post type general name', $this->theme_locale),
                    'singular_name'      => _x('Aktivitet', 'post type singular name', $this->theme_locale),
                    'menu_name'          => _x('Aktiviteter', 'admin menu', $this->theme_locale),
                    'name_admin_bar'     => _x('Aktivitet', 'add new on admin bar', $this->theme_locale),
                    'add_new'            => _x('Lägg till', 'aktivitet', $this->theme_locale),
                    'add_new_item'       => __('Lägg till aktivitet', $this->theme_locale),
                    'new_item'           => __('Ny aktivitet', $this->theme_locale),
                    'edit_item'          => __('Redigera aktivitet', $this->theme_locale),
                    'view_item'          => __('Visa aktivitet', $this->theme_locale),
                    'all_items'          => __('Alla aktiviteter', $this->theme_locale),
                    'search_items'       => __('Sök aktivitet', $this->theme_locale),
                    'parent_item_colon'  => __('Förälder:', $this->theme_locale),
                    'not_found'          => __('Inga aktiviteter hittades.', $this->theme_locale),
                    'not_found_in_trash' => __('Inga aktiviteter hittades i papperskorgen.', $this->theme_locale)
                ],
                'public'                 => false,
                'publicly_queryable'     => true,
                'show_ui'                => true,
                'show_in_menu'           => true,
                'query_var'              => true,
                'has_archive'            => false,
                'hierarchical'           => false,
                'menu_position'          => null,
                'menu_icon'              => 'dashicons-hammer',
                'supports'               => [ 'title', 'editor', 'thumbnail' ],
            ],
        ];

        foreach ($post_types as $name => $options){
            register_post_type($name, $options);
        }
    }
}
