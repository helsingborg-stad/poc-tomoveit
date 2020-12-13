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
            $title = get_the_title($item->ID);
            $time = get_field('activity_time', $item->ID);
            $image = get_field('activity_image', $item->ID);
            $group = get_field('activity_group', $item->ID);

            array_push($result, (object)[
                'title' => $title ,
                'time' => $time,
                'image' => $image,
                'group' => $group,
            ]);
        }
        return $result;
    }
}
