// pages/api/make_katong.js

import clientPromise from '../../lib/mongodb';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb', // ตั้งค่าขนาดสูงสุดของ body เป็น 4mb
        },
    },
};

export default async function handler(req, res) {
    // เชื่อมต่อกับ MongoDB
    const client = await clientPromise;
    const db = client.db('katong_db'); // ชื่อฐานข้อมูลที่คุณต้องการใช้

    if (req.method === 'POST') {
        const { name, wish, katong, image } = req.body;

        // ตรวจสอบว่าข้อมูลที่ต้องการครบถ้วนหรือไม่
        if (!name || !wish || !katong || !image) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        try {
            // บันทึกข้อมูลลงใน MongoDB
            const result = await db.collection('blessing_data').insertOne({ 
                name, 
                wish, 
                katong, 
                image 
            });
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ success: false, message: 'Error inserting data', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}