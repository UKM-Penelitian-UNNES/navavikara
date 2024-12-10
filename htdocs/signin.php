<?php
// Konfigurasi database
$servername = "sql202.byetcluster.com";  // Host database
$username = "if0_37063750";  // Username MySQL
$password = "NO";  // Password vPanel Anda
$dbname = "if0_37063750_ukmpdb";  // Nama database

// Menampilkan error (untuk debugging)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
} else {
    echo "Koneksi berhasil ke database.";
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user;
            header("Location: profile.php");
        } else {
            echo "Password salah.";
        }
    } else {
        echo "Username tidak ditemukan.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Sign In</title>
</head>
<body>
    <h2>Form Sign In</h2>
    <form action="signin.php" method="POST">
        Username: <input type="text" name="username" required><br>
        Password: <input type="password" name="password" required><br>
        <input type="submit" value="Sign In">
    </form>
</body>
</html>
