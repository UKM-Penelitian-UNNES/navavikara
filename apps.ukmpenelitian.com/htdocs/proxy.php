<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$url = 'https://riset.ukmpenelitianunnes.com/list-pdf.php';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    http_response_code(500);
    echo json_encode(["error" => "Unable to fetch data", "http_code" => $httpCode]);
    exit;
}

echo $response;
?>