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
        register_rest_route($namespace, '/randomize', [
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'rest_randomize_post'],
            ],
        ]);
        register_rest_route($namespace, '/getRunningActivity', [
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'rest_running_activity'],
            ],
        ]);
        register_rest_route($namespace, '/setDoneActivity', [
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'rest_set_done_activity'],
                'postId' => [
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
        global $wpdb;
        $mac = '00:1B:44:11:3A:B7';
        $table_daily = 'tomoveit_daily_posts';
        $table_activity = 'tomoveit_activity';

        $query = $wpdb->prepare("SELECT post1, post2, post3 FROM $table_daily WHERE id = 1");
        $query_result = $wpdb->get_row($query, ARRAY_A);

        $query = $wpdb->prepare("SELECT used_activities FROM $table_activity WHERE mac = '$mac'");
        $query_result_used = $wpdb->get_row($query);

        foreach ($query_result as $id) {
            if (!preg_match("~\b$id\b~", $query_result_used->used_activities)) {
                $postId = $id;
                $title = get_the_title($id);
                $time = get_field('activity_time', $id);
                $image = get_field('activity_image', $id);
                $group = get_field('activity_group', $id);
                $description = get_field('activity_description', $id);
                $needed = get_field('activity_whats_needed', $id);
                $numbers = get_field('activity_numbers', $id);
                $instruction = get_field('activity_instruktioner', $id);

                array_push($result, (object)[
                    'title' => $title,
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

    public function rest_running_activity() {
        global $wpdb;
        $table = 'tomoveit_activity';
        $mac = '00:1B:44:11:3A:B7';

        $query = $wpdb->get_results("SELECT selected_activity FROM $table WHERE mac = '$mac'");

        $post_id = NULL;
        foreach($query as $item) {
            $post_id = $item->selected_activity;
        }

        if(!$post_id) return false;

        return $this->prepare_post_data($post_id);
    }

    public function rest_randomize_post() {
        $postIds = array();
        global $wpdb;

        $posts = get_posts([
            'numberposts' => 3,
            'post_type' => 'activities',
            'orderby' => 'rand'
        ]);

        foreach ($posts as $item) {
            $postId = $item->ID;
            array_push($postIds, $postId );
        }

        $table = 'tomoveit_daily_posts';
        $data = array(
            'post1'=> $postIds[0],
            'post2'=> $postIds[1],
            'post3'=> $postIds[2],
        );
        $where = array('id' => 1);
        $wpdb->update( $table, $data, $where);
    }

    public function rest_set_done_activity($request) {
        global $wpdb;
        $post_id = $request->get_param('postId');
        $table = 'tomoveit_activity';
        $mac = '00:1B:44:11:3A:B7';

        //$wpdb->query($wpdb->prepare("UPDATE $table SET used_activities = CONCAT(used_activities,'".",".$post_id."') WHERE mac = '$mac'"));
        $wpdb->query($wpdb->prepare("UPDATE $table SET used_activities = CONCAT(used_activities, ' ', $post_id) WHERE mac = '$mac'"));
        $wpdb->query( $wpdb->prepare("DELETE selected_activity FROM $table WHERE mac='$mac'" ));
    }


    public function prepare_post_data($post_id) {
            $result = array();

            $postId = $post_id;
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

    public function find_mac($pin) {
        $mac = array(
            "1234"=>"00:1B:44:11:3A:B7",
            "1235"=>"01:2E:D4:11:3A:B4",
            "1122"=> "00:1B:A4:A1:3A:A7"
        );

        return $mac[$pin];
    }
}
