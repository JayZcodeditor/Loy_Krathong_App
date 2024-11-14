// pages/api/make_katong.js

import dbConnect from '../../lib/dbConnect';
import Blessing from '../../models/Blessing';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { name, wish, katong, image } = req.body;

        if (!name || !wish || !katong || !image) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        try {
            const blessing = new Blessing({ name, wish, katong, image });
            const result = await blessing.save();
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error inserting data', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
