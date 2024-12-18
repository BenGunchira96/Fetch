import React, { useState, useEffect } from 'react';

const FetchUsersComponent = () => {
  // 1. สร้าง state สำหรับเก็บข้อมูลและสถานะ
  const [users, setUsers] = useState([]); // เก็บรายชื่อผู้ใช้
  const [loading, setLoading] = useState(true); // บอกว่ากำลังโหลดหรือไม่
  const [error, setError] = useState(null); // เก็บข้อความ error (ถ้ามี)

  
  // 2. ใช้ useEffect สำหรับดึงข้อมูลจาก API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // เริ่มโหลด
        setLoading(true);
        setError(null);

        // Fetch ข้อมูลจาก API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // ตรวจสอบว่า response สำเร็จหรือไม่
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }

        // แปลงข้อมูลจาก response เป็น JSON
        const data = await response.json();

        // อัปเดต users ใน state
        setUsers(data);
      } catch (err) {
        // จัดการข้อผิดพลาด
        setError(err.message);
      } finally {
        // ไม่ว่าจะสำเร็จหรือผิดพลาด ให้ปิด loading
        setLoading(false);
      }
    };

    fetchUsers(); // เรียกฟังก์ชัน fetchUsers
  }, []); // ทำงานครั้งเดียวตอน mount


  // 3. แสดงผลตามสถานะ
  if (loading) {
    return <p>Loading...</p>; // ถ้ากำลังโหลดอยู่
  }

  if (error) {
    return <p>Error: {error}</p>; // ถ้าเกิดข้อผิดพลาด
  }

  // ถ้าข้อมูลพร้อมแล้ว
  return (
    <div>
        <h1>Fetched Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li> // แสดงชื่อผู้ใช้ใน list
        ))}
      </ul>
    </div>
  );
};

export default FetchUsersComponent;

