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

        register_rest_route($namespace, '/getTexts', [
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'rest_get_texts'],
            ],
        ]);
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
        register_rest_route($namespace, '/adminData', [
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'rest_get_admin_data'],
                'args' => [
                    'pin' => [
                        'required' => true,
                        'validate_callback' => function($param, $request, $key) {
                            if(!is_string($param)) return false;
                            return $request;
                        },
                    ],
                    'start_date' => [
                        'required' => true,
                        'validate_callback' => function($param, $request, $key) {
                            if(!is_string($param)) return false;
                            return $request;
                        },
                    ],
                    'end_date' => [
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
        register_rest_route($namespace, '/companyActivities', [
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'rest_get_company_activities'],
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
        register_rest_route($namespace, '/resetActivity', [
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'rest_reset_activity'],
            ],
            'args' => [
                'pin' => [
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
        register_rest_route($namespace, '/resetIntroduction', [
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'rest_reset_introduction'],
            ],
        ]);
    }

    public function rest_get_texts() {
        $postId = '';

        $post = get_posts([
            'numberposts' => 1,
            'post_type' => 'texts',
            'orderby' => 'ASC',
        ]);

        foreach ($post as $item) {
            $postId = $item->ID;
        }

        $text1 = get_field('texts_login_text', $postId);
        $text2 = get_field('texts_welcome_1', $postId);
        $text3 = get_field('texts_welcome_2', $postId);
        $text4 = get_field('texts_welcome_blue', $postId);
        $text5 = get_field('texts_welcome_3', $postId);
        $text6 = get_field('texts_introduction_1', $postId);
        $text7 = get_field('texts_introduction_2', $postId);
        $text8 = get_field('texts_introduction_3', $postId);
        $text9 = get_field('texts_activities_1', $postId);
        $text10 = get_field('texts_activities_2', $postId);
        $text11 = get_field('texts_activities_3', $postId);
        $text12 = get_field('texts_activities_done_1', $postId);
        $text13 = get_field('texts_activities_done_2', $postId);
        $text14 = get_field('texts_celebrate_1', $postId);
        $text15 = get_field('texts_celebrate_2', $postId);
        $text16 = get_field('texts_activities_bottom_text', $postId);
        $text17 = get_field('texts_activity_chosen_1', $postId);
        $text18 = get_field('texts_activity_chosen_2', $postId);

        $result = array(
            "textLogin" => $text1,
            "textWelcome1" => $text2,
            "textWelcome2" => $text3,
            "textWelcomeBlue" => $text4,
            "textWelcome3" => $text5,
            "textIntroduction1" => $text6,
            "textIntroduction2" => $text7,
            "textIntroduction3" => $text8,
            "textsActivities1" => $text9,
            "textsActivities2" => $text10,
            "textsActivities3" => $text11,
            "textsActivitiesDone1" => $text12,
            "textsActivitiesDone2" => $text13,
            "textsCelebrate1" => $text14,
            "textsCelebrate2" => $text15,
            "textsActivitiesBottom" => $text16,
            "textsActivityChosen1" => $text17,
            "textsActivityChosen2" => $text18,
        );

        return $result;
    }

    public function rest_get_data($request) {
        $pin = $request->get_param('pin');
        $mac = $this->find_mac($pin);

        $data_array = array();

        $startDate = date("Y-m-d", strtotime('monday this week'));
        $endDate  = date("Y-m-d", strtotime('sunday this week'));

        if($request->get_param('start_date') && $request->get_param('end_date')) {
            $startDate = $request->get_param('start_date');
            $endDate = $request->get_param('end_date');
        }

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

    public function rest_get_admin_data($request) {
        $data_array = array();

        $startDate = date("Y-m-d", strtotime('monday this week'));
        $endDate  = date("Y-m-d", strtotime('sunday this week'));

        if($request->get_param('start_date') && $request->get_param('end_date')) {
            $startDate = $request->get_param('start_date');
            $endDate = $request->get_param('end_date');
        }

        $client = new DynamoDbClient([
            'region'  => 'eu-north-1',
            'version' => 'latest',
        ]);
        try {
            $params = [
                'TableName' => 'ToMoveItBandData',
                'ProjectionExpression' => 'raw_data',
                'FilterExpression' => '#date between :date1 and :date2',
                'ExpressionAttributeNames' => [
                    '#date' => 'date',
                ],
                'ExpressionAttributeValues' => [
                    ':date1' => [
                        'S' => "{$startDate}",
                    ],
                    ':date2' => [
                        'S' => "{$endDate}",
                    ],
                ],
            ];

            while (true) {
                $result = $client->scan($params);

                foreach ($result['Items'] as $item) {
                    foreach ($item['raw_data'] as $raw) {
                        array_push($data_array, json_decode($raw));
                    }
                }

                if (isset($result['LastEvaluatedKey'])) {
                    $params['ExclusiveStartKey'] = $result['LastEvaluatedKey'];
                } else {
                    break;
                }
            }
        } catch (Exception $e) {
            return $e->getMessage();
        }

        return $data_array;
    }

    public function rest_login($request) {
        global $wpdb;
        $table = 'tomoveit_activity';

        $pin = $request->get_param('pin');
        $mac = $this->find_mac($pin);
        if(!$mac) return ([
           'error' => 'Fel pinkod'
        ]);

        $queryCheck = $wpdb->get_results("SELECT * FROM $table WHERE mac = '$mac'");

        if (count($queryCheck) == 0) {
            $wpdb->insert($table, array(
                'mac' => $mac,
                'selected_activity' => '',
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
        $admin = $this->find_if_admin($pin);

        $res = array(
            "firstTime" => $first_login,
            "admin" => $admin,
        );

        if($mac) return $res;
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
                $videoUrl = get_field('activity_youtube_link', $id);
                $author = get_field('activity_author', $id);
                $videoText = get_field('activity_video_text', $id);

                array_push($result, (object)[
                    'title' => html_entity_decode($title),
                    'time' => $time,
                    'image' => $image,
                    'group' => $group,
                    'description' => $description,
                    'needed' => $needed,
                    'numbers' => $numbers,
                    'instruction' => $instruction,
                    'videoUrl' => $videoUrl,
                    'author' => $author,
                    'postId' => $postId,
                    'videoText' => $videoText,
                ]);
            }
        }

        return $result;
    }

    public function rest_get_company_activities() {
        $activities = [];

        $posts = get_posts([
            'numberposts' => -1,
            'post_type' => 'activities_company',
        ]);

        foreach ($posts as $post) {
            array_push($activities, (object)[
                'title' => html_entity_decode(get_the_title($post->ID)),
                'id' => $post->ID,
                'cardText' => get_field('company_card_text', $post->ID),
                'videoUrl' => get_field('company_video_url', $post->ID),
                'videoText' => get_field('company_video_text', $post->ID),
                'description' => get_field('company_description', $post->ID),
                'who' => get_field('company_who', $post->ID),
                'needed' => get_field('company_needed', $post->ID),
                'when' => get_field('company_when', $post->ID),
                'howMany' => get_field('company_how_many', $post->ID),
                'friends' => get_field('company_friend', $post->ID),
                'address' => get_field('company_where', $post->ID),
                'image' => get_field('company_image', $post->ID),
                'author' => get_field('company_author', $post->ID),
                'published' => get_the_date('d M Y', $post->ID),
                'link' => get_field('company_link', $post->ID),
                'directions' => get_field('company_directions', $post->ID),
                'addressLink' => get_field('company_address_link', $post->ID),
                'imageUrl1' => get_field('company_image_1', $post->ID),
                'imageUrl2' => get_field('company_image_2', $post->ID),
                'imageUrl3' => get_field('company_image_3', $post->ID),
                'imageUrl4' => get_field('company_image_4', $post->ID),
                'imageUrl5' => get_field('company_image_5', $post->ID),
            ]);
        }

        return $activities;
    }

    public function rest_set_activity($request){
        global $wpdb;
        $pin = $request->get_param('pin');
        $mac = $this->find_mac($pin);

        $post = $request->get_param('selectedPostId');

        if($this->check_if_not_valid_post($post)) return false;

        $table = 'tomoveit_activity';
        $data = array('selected_activity'=> $post);
        $where = array('mac' => $mac);
        $wpdb->update( $table, $data, $where);

        $get_selected_post_data = $this->prepare_post_data($post);

        return $get_selected_post_data;
    }

    public function check_if_not_valid_post($postId){
        global $wpdb;

        $table_daily = 'tomoveit_daily_posts';

        $query = $wpdb->prepare("SELECT post1, post2, post3 FROM $table_daily WHERE id = 1");
        $query_result = $wpdb->get_row($query, ARRAY_A);

        foreach ($query_result as $id) {
            if ($id == $postId) return false;
        }
        return true;
    }

    public function rest_reset_activity($request){
        global $wpdb;
        $pin = $request->get_param('pin');
        $mac = $this->find_mac($pin);

        $table = 'tomoveit_activity';
        $data = array('selected_activity'=> '');
        $where = array('mac' => $mac);
        $wpdb->update( $table, $data, $where);

        return 200;
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

        $postsGroup = get_posts([
            'numberposts' => 2,
            'post_type' => 'activities',
            'orderby' => 'rand',
            'meta_query' => array(
            array(
                'key'     => 'activity_group',
                'value'   => 1,
                )
            )
        ]);

        $postsSingle = get_posts([
            'numberposts' => 1,
            'post_type' => 'activities',
            'orderby' => 'rand',
            'meta_query' => array(
                array(
                    'key'     => 'activity_group',
                    'value'   => 0,
                )
            )
        ]);

        foreach ($postsGroup as $item) {
            $postId = $item->ID;
            array_push($postIds, $postId );
        }

        foreach ($postsSingle as $item) {
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

    public function rest_reset_introduction() {
        global $wpdb;
        $table = 'tomoveit_activity';

        $wpdb->query($wpdb->prepare("UPDATE $table SET first_time=1"));
        return new WP_REST_Response(NULL, 200);
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
            $videoUrl = get_field('activity_youtube_link', $post_id);
            $author = get_field('activity_author',  $post_id);
            $videoText = get_field('activity_video_text', $post_id);

            array_push($result, (object)[
                'title' => html_entity_decode($title),
                'time' => $time,
                'image' => $image,
                'group' => $group,
                'description' => $description,
                'needed' => $needed,
                'numbers' => $numbers,
                'instruction' => $instruction,
                'postId' => $postId,
                'videoUrl' => $videoUrl,
                'author' => $author,
                'videoText' => $videoText,
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

    public function find_if_admin($pin) {
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
            $admin = get_field('armbands_admin', $the_query->posts[0]->ID);

            return $admin;
        }
    }
}
