import React, { useState, useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

// import { scheduleData } from '../data/dummy';
import { scheduleData } from '../data/calendardata'; // 
import { Header } from '../components';

function Calendar () {
  const [scheduleData, setscheduleData] = useState([]); // เก็บข้อมูลจาก API ด้วย useState
  
    // นำข้อมูลจาก Api มาแสดง
      useEffect(() => {
        fetch('http://localhost:8080/calendar.php?table=schedule')
          .then(response => response.json())
          .then(data => {
            setscheduleData(data); // นำข้อมูลไปเก็บไว้ใน state
          })
          .catch(error => {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลจาก API:', error);
          });
    }, []);
    
    const deleteEvent = (eventId) => {
      fetch(`http://localhost:8080/calendar.php?table=schedule&Id=${eventId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            // อัปเดตข้อมูลหลังจากการลบเสร็จสิ้น
            // สามารถใช้ updateGrid() เพื่อโหลดข้อมูลใหม่หรือ setscheduleData(updatedData);
            updateGrid()
          } else {
            console.error('ไม่สามารถลบเหตุการณ์ได้');
          }
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการลบเหตุการณ์:', error);
        });
    };
    
     // Function สำหรับอัพเดทข้อมูลใน GridComponent
     const updateGrid = () => {
      fetch('http://localhost:8080/connectdb.php?table=customers')
        .then(response => response.json())
        .then(data => {
          setscheduleData(data);
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูลจาก API:', error);
        });
    };



  
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        height="650px"
        eventSettings={{ dataSource:scheduleData}}
        selectedDate={new Date(2021, 0, 10)}
        eventClick={(args) => {
          console.log(args); // Log the args.data object
          if (args.data && Array.isArray(args.data)) {
            const IDs = args.data.map(item => item.Id);
            console.log(IDs);
            deleteEvent(IDs);
          } else {
            console.error('Invalid data or not an array');
          }
        }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </div>
  )
}

export default Calendar