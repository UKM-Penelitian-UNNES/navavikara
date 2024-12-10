<?php
// koneksi ke database
$conn = new mysqli("localhost", "username", "password", "if0_37063750_ukmpdb");

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $jabatan = $_POST['jabatan'];
    $departemen = $_POST['departemen'];
    $birthdate = $_POST['birthdate'];
    $prodi = $_POST['prodi'];
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    
    // Upload gambar profil
    $profile_pic = '';
    if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] == 0) {
        $profile_pic = 'uploads/' . basename($_FILES['profile_pic']['name']);
        move_uploaded_file($_FILES['profile_pic']['tmp_name'], $profile_pic);
    }

    $sql = "INSERT INTO users (fullname, jabatan, departemen, birthdate, profile_pic, prodi, username, password)
            VALUES ('$fullname', '$jabatan', '$departemen', '$birthdate', '$profile_pic', '$prodi', '$username', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "Pendaftaran berhasil!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Sign Up</title>
</head>
<body>
    <h2>Form Sign Up</h2>
    <form action="signup.php" method="POST" enctype="multipart/form-data">
        Nama Lengkap: <input type="text" name="fullname" required><br>
        Jabatan: 
        <select name="jabatan" required>
            <option value="ketua">Ketua</option>
            <option value="wakil ketua">Wakil Ketua</option>
            <option value="sekretaris">Sekretaris</option>
            <option value="bendahara">Bendahara</option>
            <option value="ketua departemen">Ketua Departemen</option>
            <option value="fungsionaris">Fungsionaris</option>
        </select><br>
        Departemen: 
        <select name="departemen" required>
            <option value="prd">PRD</option>
            <option value="hrd">HRD</option>
            <option value="ph">PH</option>
            <option value="dd">DD</option>
            <option value="red">RED</option>
            <option value="std">STD</option>
            <option value="comdev">Comdev</option>
            <option value="karya">Karya</option>
        </select><br>
        Tanggal Ulang Tahun: <input type="date" name="birthdate" required><br>
        Foto Profil: <input type="file" name="profile_pic" accept="image/*"><br>
        Prodi: <input type="text" name="prodi" required><br>
        Username: <input type="text" name="username" required><br>
        Password: <input type="password" name="password" required><br>
        <input type="submit" value="Sign Up">
    </form>
</body>
</html>
