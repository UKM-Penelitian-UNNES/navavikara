<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: signin.php");
    exit();
}
$user = $_SESSION['user'];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Profil Pengguna</title>
</head>
<body>
    <h2>Selamat datang, <?php echo $user['fullname']; ?></h2>
    <p>Jabatan: <?php echo $user['jabatan']; ?></p>
    <p>Departemen: <?php echo $user['departemen']; ?></p>
    <p>Prodi: <?php echo $user['prodi']; ?></p>
    <p>Tanggal Ulang Tahun: <?php echo $user['birthdate']; ?></p>
    <?php if ($user['profile_pic']): ?>
        <img src="<?php echo $user['profile_pic']; ?>" alt="Foto Profil" style="width: 150px; height: 150px;">
    <?php else: ?>
        <p>Belum ada foto profil.</p>
    <?php endif; ?>
    <br><br>
    <a href="logout.php">Logout</a>
</body>
</html>
