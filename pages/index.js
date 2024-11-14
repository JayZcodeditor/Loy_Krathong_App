// pages/index.js

import { useEffect, useState } from 'react';

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // เรียก API เพื่อดึงข้อมูลจาก MongoDB
        const fetchData = async () => {
            try {
                const response = await fetch('/api/fetch_katong');
                const result = await response.json();
                if (result.success) {
                    setData(result.data); // ตั้งค่าข้อมูลที่ได้จาก API
                } else {
                    console.error('Failed to fetch data:', result.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // เปลี่ยนสถานะ loading เป็น false
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Welcome to Katong Blessing</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <h2>{item.name}</h2>
                        <p>Wish: {item.wish}</p>
                        <p>Katong: {item.katong}</p>
                        {item.image && <img src={item.image} alt={item.name} width="200" />}
                    </li>
                ))}
            </ul>
        </div>
    );
}
