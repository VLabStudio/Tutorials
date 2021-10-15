<?php
    // The original source code
    // https://stackoverflow.com/questions/23702855/php-websocket-connection-to-node-js-server

    // Create a socket
    $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    $result = socket_connect($socket, "127.0.0.1", 1337);

    if (!$result)
        die("cannot connect " . socket_strerror(socket_last_error()) . PHP_EOL);

    for ($i = 0; $i <= 1000; $i++) {

        // Write test data to the server
        $bytes = socket_write($socket, json_encode(array(
            "name" => "Test",
            "i" => $i
        )) . "%;%");

        // Print to the console
        echo "Wrote " . number_format($bytes) . " bytes to socket" . PHP_EOL;

    }