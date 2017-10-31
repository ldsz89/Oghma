<?php
  require 'vendor/mustache.php/src/Mustache/Autoloader.php';
  Mustache_Autoloader::register();

  // $template = 'Hello, {{planet}}!';
  $template = file_get_contents("templates/alerts.mustache");
  // a.k.a. view
  // $hash = array(
  //   'message' => 'This was created by mustache',
  //   'close' => true,
  //   'type' => 'success'
  // );

  $hash = array(
    'alerts' => array(
      array(
        'message' => 'This was created by mustache',
        'close' => true,
        'type' => 'success'
      ),
      array(
        'message' => 'This was also created by mustache',
        'type' => 'info',
        'title' => 'Mustache Title'
      ),
      array(
        'message' => 'This was also also created by mustache',
        'type' => 'danger',
        'title' => 'Mustache also Title'
      )
    )
  );

  $m = new Mustache_Engine;
  // echo $m->render('Hello, {{planet}}!', array('planet' => 'World'));
 ?>

<!DOCTYPE html>
<!-- Created by Professor Wergeles for CS4830 at the University of Missouri -->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ Mustache }} Across Languages</title>

    <link
  	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
  	rel="stylesheet"
  	integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
  	crossorigin="anonymous">

    <style>
      #wrapper {
          width: 600px;
          margin: 100px auto;
      }
    </style>

    <script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        crossorigin="anonymous"></script>

    <script
    	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
    	integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
    	crossorigin="anonymous"></script>



  </head>
  <body>
      <div id="wrapper">

        <?php
          echo $m->render($template, $hash);
         ?>

      </div>
  </body>
</html>
