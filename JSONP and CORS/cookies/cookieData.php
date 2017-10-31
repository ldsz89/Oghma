<?php

	$count = ( $_COOKIE['count'] ) ? null : $_COOKIE['count'];

	if( ! $count ) {
		setCookie('count', 1);
	} else {
		setCookie('count', $count + 1);
	}

	// This will result in a error
	// header('Access-Control-Allow-Origin: *');

	// This is to allow cookies while connecting from our local computer to this service
	header('Access-Control-Allow-Origin: null');

	// Tell server that cookies are allowed
	header('Access-Control-Allow-Credendials: true');

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
