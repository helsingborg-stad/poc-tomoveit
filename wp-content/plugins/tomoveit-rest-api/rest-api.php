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
}
