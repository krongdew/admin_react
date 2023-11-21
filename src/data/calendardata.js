import React from 'react';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';

 
// เปลี่ยน scheduleData เป็น function ที่จะรับข้อมูลเป็นพารามิเตอร์
const scheduleData = (data) => {
    // return ข้อมูลที่ถูก set
    return [
      ...data.map(apiCalendar => ({
        Id: apiCalendar.Id,
        Subject: apiCalendar.Subject,
        Location: apiCalendar.Location,
        StartTime: apiCalendar.StartTime, 
        EndTime: apiCalendar.EndTime,
        CategoryColor: apiCalendar.CategoryColor,
      }))
    ];
  };

  export default scheduleData; // ส่งออก function เพื่อการใช้งาน

  