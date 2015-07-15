<?php

$day = 24 * 60 * 60;

$is = fopen('php://input', 'r');

$post = stream_get_contents($is);

fclose($is);

if(strlen($post)) {
    $record = json_decode($post, true);
    $record['time'] = time();

    json_encode($record);

    $record_filename = 'records' . DIRECTORY_SEPARATOR . date('Ymd');

    $fs = fopen($record_filename, 'a');

    fputs($fs, json_encode($record) . "\n");

    fclose($fs);
} else {
    $start = isset($_GET['start']) ? $_GET['start'] : strtotime('last sunday');
    $end = isset($_GET['end']) ? $_GET['end'] : strtotime('sunday');

    $records = [];

    while($start <= $end) {
        $record_filename = 'records' . DIRECTORY_SEPARATOR . date('Ymd', $start);

        if(file_exists($record_filename)) {
            $data = explode("\n", file_get_contents($record_filename));

            foreach($data as $datum) {
                strlen($datum) && $records[] = $datum;
            }
        }

        $start += $day;
    }

    header('Content-Type: application/json');
    echo '[' . implode(',', $records) . ']';
}
