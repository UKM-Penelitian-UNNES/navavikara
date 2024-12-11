<?php
// Mengizinkan akses dari domain tertentu
header("Access-Control-Allow-Origin: https://apps.ukmpenelitianunnes.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Mengatur konten sebagai JSON
header('Content-Type: application/json');

// Ganti dengan folder yang sesuai
$directory = './riset'; 
$files = array();

// Memeriksa apakah direktori ada
if (is_dir($directory)) {
    // Membuka direktori
    if ($handle = opendir($directory)) {
        // Membaca isi direktori
        while (false !== ($entry = readdir($handle))) {
            // Memfilter file PDF
            if ($entry != "." && $entry != ".." && pathinfo($entry, PATHINFO_EXTENSION) == 'pdf') {
                $files[] = $entry; // Menambahkan file ke array
            }
        }
        closedir($handle); // Menutup direktori
    }
}

// Mengembalikan daftar file dalam format JSON
echo json_encode($files);
?>