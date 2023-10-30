<?php
// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล MySQL
$host = "localhost";
$username = "root";
$password = "Dew@0875350828#";
$database = "admin_panel";

// สร้างการเชื่อมต่อ
$conn = new mysqli($host, $username, $password, $database);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("การเชื่อมต่อล้มเหลว: " . $conn->connect_error);
}

// ดึงข้อมูลจากฐานข้อมูล
$sql = "SELECT * FROM customer";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// ตั้งค่าส่วนหัวเพื่อระบุว่าไฟล์นี้รีเทิร์น JSON
header('Content-Type: application/json');

// ส่งข้อมูล JSON กลับไปยัง JavaScript
echo json_encode($data);

// ปิดการเชื่อมต่อ
$conn->close();
?>
