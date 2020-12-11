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
}
