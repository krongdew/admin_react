import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Header,Button } from '../components';
import { customersGrid } from '../data/customerdata'; // เรียกใช้คอลัมน์และคอมโพเนนต์ของตาราง
import axios from 'axios'; // Library for making HTTP requests
import { useStateContext } from '../contexts/ContextProvider';

function Customers() {
  const [customersData, setCustomersData] = useState([]); // เก็บข้อมูลจาก API ด้วย useState
  const [showAddForm, setShowAddForm] = useState(false);
  const { currentColor } = useStateContext();

const handleAddButtonClick = () => {
  setShowAddForm(true);
};

const handleFormClose = () => {
  setShowAddForm(false);
};
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
       // แสดงข้อความแจ้งเตือนเมื่อข้อมูลถูกเพิ่มเรียบร้อย
       alert('เพิ่มข้อมูลสำเร็จ');
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
    const deleteData = (ids) => {
      fetch(`http://localhost:8080/connectdb.php?table=customers&CustomerID=${ids.join(',')}`, {
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
        {!showAddForm ? ( // เช็คว่าควรแสดงฟอร์มหรือไม่
          <button onClick={handleAddButtonClick} style={{backgroundColor:currentColor}} className='text-l p-3 
          hover:drop-shadow-xl hover:bg-light-gray text-white rounded-3xl mb-5 '>Add Customer</button>
        ) : (
          <div className="add-form">
            <div className="space-y-12">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">Add customer</h2>
            
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              
            <div className="sm:col-span-3">
              <label htmlFor="CustomerName" className="block text-sm font-medium leading-6 text-gray-900">
               Customer's Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="CustomerName"
                  id="CustomerName"
                  autoComplete="given-name"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:pl-2"
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Customer's Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="CustomerEmail"
                  id="CustomerEmail"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:pl-2"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            
            <div className="col-span-full">
              <label htmlFor="ProjectName" className="block text-sm font-medium leading-6 text-gray-900">
                Project's name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="ProjectName"
                  id="ProjectName"
                  autoComplete="ProjectName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:pl-2"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            
            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="Weeks" className="block text-sm font-medium leading-6 text-gray-900">
              Weeks
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="Weeks"
                  id="Weeks"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:pl-2"
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
              Budget
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="Budget"
                  id="Budget"
                  autoComplete="Budget"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:pl-2"
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="Location" className="block text-sm font-medium leading-6 text-gray-900">
              Location
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="Location"
                  id="Location"
                  autoComplete="Location"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:pl-2"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            
            <div className="col-span-full">
              <label htmlFor="ProjectName" className="block text-sm font-medium leading-6 text-gray-900">
                Upload Images
              </label>
              <div className="mt-2">
              <input type="file" name="CustomerImage"  
              class="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100 sm:pl-2 " 
              onChange={handleImageChange} />
              </div>
            </div>
            
            
            
            <div className="col-span-full">
            <div className="mb-6 flex items-center justify-end gap-x-6">
            <button onClick={addCustomer} className="mt-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Add</button>
            <button onClick={handleFormClose} className="ml-3 text-sm font-semibold leading-6 text-gray-900">Close</button> 
            </div>
            </div>
            
          </div>
            {/* <input type="text" name="CustomerName" placeholder="Customer Name" onChange={handleFormChange} /> */} 
          </div>
          
        </div>
        
        
        )}
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
            const customerIDs = args.data.map(item => item.CustomerID); // รับ ID ทั้งหมดที่ต้องการลบ
            deleteData(customerIDs); // ส่ง IDs ไปที่ API เพื่อการลบ
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


