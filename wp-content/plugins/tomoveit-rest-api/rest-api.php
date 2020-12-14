<?php

if ( ! defined( 'ABSPATH' ) ) {
    die( 'Silence is golden.' );
}

require 'vendor/autoload.php';
use Aws\S3\S3Client;
use Aws\DynamoDb\DynamoDbClient;
use Aws\Credentials\CredentialProvider;

class TomoveitRestApi_Routes {

    public function register_routes()
    {
        $version = '1';
        $namespace = 'TomoveitRestApi/v' . $version;

        register_rest_route($namespace, '/data', [
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'rest_get_data'],
            ],
        ]);
        register_rest_route($namespace, '/login', [
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'rest_login'],
                'args' => [
                    'pin' => [
                        'required' => true,
                        'validate_callback' => function($param, $request, $key) {
                            if(!is_string($param)) return false;
                            return $request;
                        },
                    ],
                ],
            ],
        ]);
        register_rest_route($namespace, '/activities', [
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'rest_get_activities'],
            ],
        ]);

        register_rest_route($namespace, '/setActivity', [
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'rest_set_activity'],
            ],
            'args' => [
                'pin' => [
                    'required' => true,
                    'validate_callback' => function($param, $request, $key) {
                        if(!is_string($param)) return false;
                        return $request;
                    },
                ],
                'selectedPostId' => [
                    'required' => true,
                    'validate_callback' => function($param, $request, $key) {
                        if(!is_string($param)) return false;
                        return $request;
                    },
                ],
            ],

        ]);
    }

    public function rest_get_data() {
        $provider = CredentialProvider::defaultProvider();

        $client = new DynamoDbClient([
            'region'  => 'eu-north-1',
            'version' => 'latest',
        ]);

        $result = $client->describeTable(array(
            'TableName' => 'ToMoveItBandData'
        ));
        return $result['Table'];
    }

    public function rest_login($request) {
        $pin = $request->get_param('pin');

        if($pin === '1234') return 'ok';
        else return 'no';
    }

    public function rest_get_activities() {
        $result = array();

        $posts = get_posts([
            'numberposts' => 3,
            'post_type' => 'activities',
            'orderby' => 'rand'
        ]);

        foreach ($posts as $item) {
            $postId = $item->ID;
            $title = get_the_title($item->ID);
            $time = get_field('activity_time', $item->ID);
            $image = get_field('activity_image', $item->ID);
            $group = get_field('activity_group', $item->ID);
            $description = get_field('activity_description', $item->ID);
            $needed = get_field('activity_whats_needed', $item->ID);
            $numbers = get_field('activity_numbers', $item->ID);
            $instruction = get_field('activity_instruktioner', $item->ID);

            array_push($result, (object)[
                'title' => $title ,
                'time' => $time,
                'image' => $image,
                'group' => $group,
                'description' => $description,
                'needed' => $needed,
                'numbers' => $numbers,
                'instruction' => $instruction,
                'postId' => $postId
            ]);
        }
        return $result;
    }

    public function rest_set_activity($request){
        global $wpdb;
        $mac = '00:1B:44:11:3A:B7';

        $post = $request->get_param('selectedPostId');

        $table = 'tomoveit_activity';
        $data = array('selected_activity'=> $post);
        $where = array('mac' => $mac);
        $wpdb->update( $table, $data, $where);

        $get_selected_post_data = $this->prepare_post_data($post);

        return $get_selected_post_data;
    }

    public function prepare_post_data($post_id) {
            $result = array();

            $postId = $$post_id;
            $title = get_the_title($post_id);
            $time = get_field('activity_time', $post_id);
            $image = get_field('activity_image', $post_id);
            $group = get_field('activity_group', $post_id);
            $description = get_field('activity_description', $post_id);
            $needed = get_field('activity_whats_needed', $post_id);
            $numbers = get_field('activity_numbers', $post_id);
            $instruction = get_field('activity_instruktioner', $post_id);

            array_push($result, (object)[
                'title' => $title ,
                'time' => $time,
                'image' => $image,
                'group' => $group,
                'description' => $description,
                'needed' => $needed,
                'numbers' => $numbers,
                'instruction' => $instruction,
                'postId' => $postId
            ]);

        return $result;
    }
}
