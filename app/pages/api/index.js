import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('your_database_name');

    switch (req.method) {
        case 'GET':
            const data = await db.collection('your_collection_name').find({}).toArray();
            res.status(200).json({ success: true, data });
            break;

        case 'POST':
            const { name, description } = req.body;
            const result = await db.collection('your_collection_name').insertOne({ name, description });
            res.status(201).json({ success: true, data: result });
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
