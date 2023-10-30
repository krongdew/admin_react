import React, { useEffect, useState } from 'react';

const ApiPage = () => {
  const [htmlData, setHtmlData] = useState('');

  useEffect(() => {
    // สร้างการเรียก API โดยใช้ fetch
    fetch('http://localhost:8081/Api.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('เกิดข้อผิดพลาดในการรับข้อมูล');
        }
        return response.text(); // ใช้ .text() เพื่อรับเนื้อหาทั้งหมดของหน้า
      })
      .then(data => {
        // เมื่อรับข้อมูลจาก API สำเร็จ
        setHtmlData(data);
      })
      .catch(error => {
        // หากเกิดข้อผิดพลาดในการรับข้อมูล
        console.error('เกิดข้อผิดพลาดในการเรียก API: ', error);
      });
  }, []);

  return (
    <div>
      <h1>API Page</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlData }} />
    </div>
  );
};

export default ApiPage;
