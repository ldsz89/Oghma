<?php
// Created by Professor Wergeles for CS4830 at the University of Missouri

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, PUT");
    header("Access-Control-Max-Age: 10");

    header('Content-Type: application/json');
    $data = ['planets' => []];
    $data['planets'][] = 'Mercury';
    $data['planets'][] = 'Venus';
    $data['planets'][] = 'Earth';
    $data['planets'][] = 'Mars';
    $data['planets'][] = 'Jupiter';
    $data['planets'][] = 'Saturn';
    $data['planets'][] = 'Uranus';
    $data['planets'][] = 'Neptune';

    print json_encode($data);

?>
