<?php
  $dinoID = empty($_GET['dinoID']) ? 'index' : strtolower($_GET['dinoID']);
  $appData = json_decode(file_get_contents('appData.json'), true);

  $dino = empty($appData['dinosaurs'][$dinoID]) ? null : $appData['dinosaurs'][$dinoID];
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Dinosaur App</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- jQuery? -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

    <style>
      body {
        text-align: center;
      }
      p, .list-group {
        width: 450px;
        margin: 0 auto;
      }
      img {
        margin-top: 15px;
        margin-bottom: 100px;
        width: 450px;
      }
    </style>
  </head>
  <body>
    <?php
      // DO NOT DO THIS
      // if($dinoID == 'index') {
      //   echo "<h1>" . $appData['appTitle'] . "</h1>";
      //   echo "<ul>";
      //   foreach ($appData['dinosaurs'] as $k => $v) {
      //     echo "<li>";
      //     ...
      //   }
      // }
     ?>

     <?php if($dinoID == 'index') { ?>
     <h1> <?php print $appData['appTitle']; ?> </h1>

     <ul class="list-group">
       <?php foreach ($appData['dinosaurs'] as $key => $value) {
        //  echo $key . "\n";
        //  echo $value . "\n";
        //  echo $value['name'] . "\n";
        ?>

       <li class="list-group-item">
         <a href="<?php print $k; ?>"> <?php print $value['name']; ?></a>

         <!-- This was using GET in url -->
         <!-- <a href="<?php //print 'index.php?dinoID=' . $key; ?>"><?php //print $value['name']; ?></a> -->
       </li>

       <?php } ?>

     </ul>
     <?php } else { ?>

       <h1> <?php print $dino['name']; ?> </h1>
       <p> <?php print $dino['desc']; ?> </p>
       <img src="<?php print $appData['imageBasePath'] . $dino['img']; ?>">
   <?php } ?>
  </body>
</html>
