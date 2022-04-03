import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, name, message } = req.body;

        if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
            res.status(422).json({ message: 'Invalid input.' });

            return;
        }

        const newMessage = {
            email,
            name,
            message
        };

        let client;

        const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.einhe.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

        try {
            client = new MongoClient(connectionString)
            await client.connect();
        } catch (error) {
            res.status(500).json({ message: 'Could not connect to the database.' })
            return;
        }

        const db = client.db();

        try {
            const result = await db.collection('messages').insertOne(newMessage);
            console.log(result);
        } catch (error) {
            res.status(500).json({ message: 'Storing message failed! '});
            return;
        } finally {
            client.close();
        }

        res.status(201).json({ message: 'Successfully stored message!', message: newMessage });
    }
}

export default handler;