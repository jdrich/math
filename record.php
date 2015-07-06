<?php

$is = fopen('php://input', 'r');

$post = stream_get_contents($is);

fclose($is);

$record = json_decode($post, true);
$record['time'] = time();

json_encode($record);

$record_filename = 'records' . DIRECTORY_SEPARATOR . date('Ymd');

$fs = fopen($record_filename, 'a');

fputs($fs, json_encode($record) . "\n");

fclose($fs);
