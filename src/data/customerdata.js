import React from 'react';


const customerGridImage = (props) => {
    
    return (
      <div className="image flex gap-4">
        <img
          className="rounded-full w-10 h-10"
          src={props.CustomerImage}
          alt="customers"
        />
        <div>
          <p>{props.CustomerName}</p>
          <p>{props.CustomerEmail}</p>
        </div>
      </div>
    );
  };
  
  // ... ส่วนอื่น ๆ ของโค้ด ...
  
  
const customerGridStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
      <p>{props.Status}</p>
    </div>
  );  

export const customersGrid = [
    { type: 'checkbox', width: '50' },
    { headerText: 'Name',
      width: '150',
      template: customerGridImage,
      textAlign: 'Center' },
      
    { field: 'ProjectName',
      headerText: 'Project Name',
      width: '150',
      textAlign: 'Center' },
      
    { field: 'Status',
      headerText: 'Status',
      width: '130',
      format: 'yMd',
      textAlign: 'Center',
      template: customerGridStatus },
      
    {
      field: 'Weeks',
      headerText: 'Weeks',
      width: '100',
      format: 'C2',
      textAlign: 'Center' },
      
    { field: 'Budget',
      headerText: 'Budget',
      width: '100',
      format: 'yMd',
      textAlign: 'Center' },
  
    { field: 'Location',
      headerText: 'Location',
      width: '150',
      textAlign: 'Center' },
  
    { field: 'CustomerID',
      headerText: 'Customer ID',
      width: '120',
      textAlign: 'Center',
      isPrimaryKey: true,
    },
  
  ];
    
// เปลี่ยน customersData เป็น function ที่จะรับข้อมูลเป็นพารามิเตอร์
const setCustomersData = (data) => {
    // return ข้อมูลที่ถูก set
    return [
      ...data.map(apiCustomer => ({
        CustomerID: apiCustomer.CustomerID,
        CustomerName: apiCustomer.CustomerName,
        CustomerEmail: apiCustomer.CustomerEmail,
        CustomerImage: apiCustomer.CustomerImage, // ตัวอย่าง URL ของรูปภาพจากข้อมูล API
        ProjectName: apiCustomer.ProjectName,
        Status: apiCustomer.Status,
        StatusBg: apiCustomer.StatusBg,
        Weeks: apiCustomer.Weeks,
        Budget: apiCustomer.Budget,
        Location: apiCustomer.Location,
      }))
    ];
  };

  export default setCustomersData; // ส่งออก function เพื่อการใช้งาน

  