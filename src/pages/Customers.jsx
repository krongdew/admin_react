import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { customersGrid } from '../data/customerdata'; // เรียกใช้คอลัมน์และคอมโพเนนต์ของตาราง
import axios from 'axios'; // Library for making HTTP requests

function Customers() {
  const [customersData, setCustomersData] = useState([]); // เก็บข้อมูลจาก API ด้วย useState
  // State to manage form data
  // เปลี่ยนชื่อตัวแปร formData ในตำแหน่งที่ซ้ำกัน
const [formDataAdd, setFormDataAdd] = useState({
  CustomerName: '',
  CustomerEmail: '',
  ProjectName: '',
  Status: '',
  Weeks: '',
  Budget: '',
  Location: '',
  CustomerImage: null,
});

const handleFormChange = (e) => {
  setFormDataAdd({
    ...formDataAdd,
    [e.target.name]: e.target.value,
  });
};

const handleImageChange = (e) => {
  setFormDataAdd({
    ...formDataAdd,
    CustomerImage: e.target.files[0],
  });
};

const addCustomer = () => {
  console.log('Data from form:', formDataAdd);
  const newData = { ...formDataAdd };

  const form = new FormData();
  Object.keys(newData).forEach((key) => {
    form.append(key, newData[key]);
  });

  axios.post('http://localhost:8080/connectdb.php?table=customers', form)
    .then((response) => {
      console.log('Customer added:', response.data);
      updateGrid();
    })
    .catch((error) => {
      console.error('Error adding customer:', error);
    });
};


    // นำข้อมูลจาก Api มาแสดง
  useEffect(() => {
    fetch('http://localhost:8080/connectdb.php?table=customers')
      .then(response => response.json())
      .then(data => {
        setCustomersData(data); // นำข้อมูลไปเก็บไว้ใน state
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลจาก API:', error);
      });
  }, []);
  
    // Function สำหรับลบข้อมูล
    const deleteData = (id) => {
      fetch(`http://localhost:8080/connectdb.php?table=customers&CustomerID=${id}`, {
        method: 'DELETE',
      })
      .then(response => response.text())
      .then(result => {
        console.log('Data deleted:', result);
        // ทำสิ่งที่คุณต้องการหลังจากการลบข้อมูล
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการลบข้อมูล:', error);
      });
    };
    
    
  
      // Function สำหรับแก้ไขข้อมูล
const editData = (id, newData) => {
  console.log('ID ของข้อมูลที่เปลี่ยนแปลง:', id);
  console.log('ข้อมูลที่เปลี่ยนแปลง:', newData);
  
  fetch(`http://localhost:8080/connectdb.php?table=customers&CustomerID=${id}`, {
    method: 'PUT',
    body: JSON.stringify(newData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (response.ok) {
      updateGrid(); // ถ้าการแก้ไขเสร็จสมบูรณ์ ให้เรียกใช้งาน updateGrid เพื่ออัพเดทข้อมูล
      console.log('ID ของข้อมูลที่เปลี่ยนแปลง:', id);
      console.log('ข้อมูลที่เปลี่ยนแปลง:', newData);
    } else {
      throw new Error('แก้ไขข้อมูลไม่สำเร็จ');
    }
  })
  .catch(error => {
    console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูล:', error);
  });
};


    // Function สำหรับอัพเดทข้อมูลใน GridComponent
    const updateGrid = () => {
      fetch('http://localhost:8080/connectdb.php?table=customers')
        .then(response => response.json())
        .then(data => {
          setCustomersData(data);
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูลจาก API:', error);
        });
    };
      
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Customers" />
      {/* Add Form */}
      <div className="add-form">
        <h3>Add Customer</h3>
        <input type="text" name="CustomerName" placeholder="Customer Name" onChange={handleFormChange} />
        <input type="file" name="CustomerImage" onChange={handleImageChange} />
        <button onClick={addCustomer}>Add</button>
      </div>

      {/* Existing GridComponent */}
      <GridComponent
        dataSource={customersData}
        allowPaging
        allowSorting
        width="auto"
        toolbar={['Delete', 'Update']} // เพิ่มปุ่ม Update เพื่ออัพเดทข้อมูล
        editSettings={{ allowDeleting: true, allowEditing: true, showDeleteConfirmDialog: true }}
        actionBegin={(args) => {
          if (args.requestType === 'delete') {
            const customerId = args.data[0].CustomerID;
            // console.log('Deleted customer ID:', customerId);
            deleteData(customerId);
          }
        }}
        actionComplete={(args) => {
          if (args.requestType === 'save') {
            console.log('Saved args data:', args.data); // ดูข้อมูลที่ถูกส่งมาเมื่อบันทึก
            const customerId = args.data.CustomerID;
            const newData = args.data; // ข้อมูลที่แก้ไข
            console.log('ส่งข้อมูลไปที่ editData:', customerId, newData); // ตรวจสอบข้อมูลที่ถูกส่งไป editData
            editData(customerId, newData); // ตรวจสอบว่า customerId และ newData ถูกส่งไปถูกต้องหรือไม่
          }
        }}
        
        
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} {...item.headerText}  {...item.isPrimaryKey} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page,Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
}

export default Customers;


