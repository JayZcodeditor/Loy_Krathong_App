// pages/api/fetch_katong.js

import dbConnect from '../../lib/dbConnect';
import Blessing from '../../models/Blessing';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const data = await Blessing.find({});
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching data', error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
