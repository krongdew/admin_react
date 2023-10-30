// const express = require('express')
// const app = express();
// const mysql = require('mysql')
// const cors = require('cors');

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     // ตั้งค่าการเชื่อมต่อกับฐานข้อมูล MySQL
//     user : "root",
//     host : "localhost",
//     password : "Dew@0875350828#",
//     database : "admin_panel",
// })

// app.get('/customer',(req,res) => 
//     db.query("SELECT * FROM customer", (err ,result) => {
//         if(err){
//             console.log(err);
//         }else {
//             res.send(result);
//         }
//     })
// )

// app.listen('3001', () => {
//     console.log('Server is running on port 3001')
// })
