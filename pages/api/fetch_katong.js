// pages/api/fetch_katong.js

import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    // เชื่อมต่อกับ MongoDB
    const client = await clientPromise;
    const db = client.db('katong_db'); // ใช้ชื่อฐานข้อมูลที่คุณต้องการ

    if (req.method === 'GET') {
        try {
            // ดึงข้อมูลทั้งหมดจาก collection 'blessing_data'
            const data = await db.collection('blessing_data').find({}).toArray();
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching data', error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
