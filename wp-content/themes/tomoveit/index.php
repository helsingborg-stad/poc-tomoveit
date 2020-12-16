<?php ?>
<!DOCTYPE html>

 <html <?php language_attributes(); ?> class="no-js">
    <head>
        <style>
        html {
        display: none;
        }
        </style>
        <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
        <meta name="viewport" content="width=device-width">
        <title>Tomoveit</title>
        <?php wp_head(); ?>
    </head>
    <body >
        <div id="root">
        </div>
        <?php wp_footer(); ?>
    </body>
</html>
