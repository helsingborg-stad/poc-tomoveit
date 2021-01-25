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

        <!-- Google Analytics -->
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'G-KS0FY929S5', 'auto');
            ga('send', 'pageview');
        </script>
        <!-- End Google Analytics -->

        <?php wp_head(); ?>
    </head>
    <body >
        <div id="root">
        </div>
        <?php wp_footer(); ?>
    </body>
</html>
