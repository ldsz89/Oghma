<?php
  $callback = empty($_GET['callback']) ? 'dataRecieved' : $_GET['callback'];

  header('Content-Type: application/json');
  $data = ['planets' => []];
  $data['planets'][] = 'Mercury';
  $data['planets'][] = 'Venus';
  $data['planets'][] = 'Earth';
  $data['planets'][] = 'Mars';
  $data['planets'][] = 'Juptier';
  $data['planets'][] = 'Saturn';
  $data['planets'][] = 'Uranus';
  $data['planets'][] = 'Neptune';

  print $callback . "(" . json_encode($data) . ");";
 ?>
