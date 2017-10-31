<?php
// Created by Professor Wergeles for CS4830 at the University of Missouri

	// Set MIME-type
	header('Content-type: image/jpeg');

	// Open "cookieMonster.jpg"
	$handle = fopen('funny.jpg', 'rb');

	// Set buffer size (8kb)
	$bufferLen = 8192;

	// Read "cookieMonster.jpg" and print to browser
	while ($buffer = fread($handle, $bufferLen)) {
		print $buffer;
	}

	// Close our file
	fclose($handle);
?>
