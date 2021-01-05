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
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'rest_get_data'],
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
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'rest_get_activities'],
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
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'rest_running_activity'],
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
                'pin' => [
                    'required' => true,
                    'validate_callback' => function($param, $request, $key) {
                        if(!is_string($param)) return false;
                        return $request;
                    },
                ],
            ],
        ]);
    }

    public function rest_get_data($request) {
        $pin = $request->get_param('pin');
        $mac = $this->find_mac($pin);
        $data_array = array();

        //$startDate = date("Y-m-d", strtotime('monday this week'));
        //$endDate  = date("Y-m-d", strtotime('friday this week'));

        $startDate = '2020-12-14';
        $endDate = '2020-12-18';

        $client = new DynamoDbClient([
            'region'  => 'eu-north-1',
            'version' => 'latest',
        ]);
        try {
        $result = $client->query([
            'TableName' => 'ToMoveItBandData',
            'KeyConditionExpression' => 'bandId = :v1 AND #date BETWEEN :date1 AND :date2',
            'ProjectionExpression' => 'raw_data',
            'ExpressionAttributeNames' => [
                '#date' => 'date',
            ],
            'ExpressionAttributeValues' => [
                ':v1' => [
                    'S' => "{$mac}",
                ],
                ':date1' => [
                    'S' => "{$startDate}",
                ],
                ':date2' => [
                    'S' => "{$endDate}",
                ],
            ],
        ]);
        } catch (Exception $e) {
            return $e->getMessage();
        }

        foreach ($result['Items'] as $item) {
            foreach ($item['raw_data'] as $raw) {
                array_push($data_array, json_decode($raw));
            }
        }

        return $data_array;
    }

    public function rest_login($request) {
        global $wpdb;
        $table = 'tomoveit_activity';

        $pin = $request->get_param('pin');
        $mac = $this->find_mac($pin);

        $queryCheck = $wpdb->get_results("SELECT * FROM $table WHERE mac = '$mac'");

        if (count($queryCheck) == 0) {
            $wpdb->insert($table, array(
                'mac' => $mac,
                'selected_activities' => '',
                'used_activities' => '',
                'first_time' => 1,
            ));
        }

        $query = $wpdb->get_results("SELECT first_time FROM $table WHERE mac = '$mac'");
        $first_login = NULL;
        foreach($query as $item) {
            $first_login = $item->first_time;
        }

        if($first_login == '1') {
            $wpdb->query($wpdb->prepare("UPDATE $table SET first_time = 0 WHERE mac = '$mac'"));
        }

        if($mac) return $first_login;
        else return 'no';
    }

    public function rest_get_activities($request) {
        $pin = $request->get_param('pin');
        $result = array();
        global $wpdb;
        $mac = $this->find_mac($pin);
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
        $pin = $request->get_param('pin');
        $mac = $this->find_mac($pin);

        $post = $request->get_param('selectedPostId');

        $table = 'tomoveit_activity';
        $data = array('selected_activity'=> $post);
        $where = array('mac' => $mac);
        $wpdb->update( $table, $data, $where);

        $get_selected_post_data = $this->prepare_post_data($post);

        return $get_selected_post_data;
    }

    public function rest_running_activity($request) {
        global $wpdb;
        $table = 'tomoveit_activity';
        $pin = $request->get_param('pin');
        $mac = $this->find_mac($pin);

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

        $table = 'tomoveit_activity';
        $wpdb->query($wpdb->prepare("UPDATE $table SET selected_activity='', used_activities=''"));

    }

    public function rest_set_done_activity($request) {
        global $wpdb;
        $pin = $request->get_param('pin');
        $mac = $this->find_mac($pin);
        $post_id = $request->get_param('postId');

        $table = 'tomoveit_activity';

        //$wpdb->query($wpdb->prepare("UPDATE $table SET used_activities = CONCAT(used_activities,'".",".$post_id."') WHERE mac = '$mac'"));
        $wpdb->query($wpdb->prepare("UPDATE $table SET used_activities = CONCAT(used_activities, ' ', $post_id) WHERE mac = '$mac'"));
        $wpdb->query($wpdb->prepare("UPDATE $table SET selected_activity = '' WHERE mac = '$mac'"));
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
        /*$mac = array(
            "1234"=>"C6:4D:26:09:46:4B",  // admin
            "0559"=>"EC:82:D8:BA:77:11",
            "0535"=>"C6:4D:26:09:46:4B",
            "0816"=> "ED:B7:AD:74:53:4B",
            "0496"=>"F6:31:38:49:9A:A3",
            "0486"=>"D5:65:44:90:DB:20",
            "0309"=>"ED:6B:DB:59:18:02",
            "0493"=>"C0:AB:EC:3B:DC:AA",
            "0222"=>"DE:E3:5A:C8:EC:88",
            "0074"=>"FF:84:9D:49:D9:23",
            "0555"=>"D4:EC:C3:A6:1C:AC",
            "0797"=>"D9:58:25:89:5D:8B",
            "0269"=>"DA:F5:74:1D:2B:2D",
            "0702"=>"CC:99:C3:91:35:89",
            "0502"=>"EE:2F:E2:02:EE:F7",
            "0634"=>"FB:0F:4F:39:39:CB",
        );*/

        $args = array(
            'numberposts'	=> 1,
            'post_type'		=> 'armbands',
            'meta_key'		=> 'armbands_pin_code',
            'meta_value'	=> $pin
        );

        $the_query = new WP_Query( $args );

        if(empty($the_query->posts)) {
            return false;
        } else {
            $mac = get_field('armbands_mac_adress', $the_query->posts[0]->ID);
            return $mac;
        }

        /*if($mac[$pin]) {
            return $mac[$pin];
        } else {
            return false;
        }*/
    }
}
