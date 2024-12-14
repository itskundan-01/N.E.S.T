const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (including nest.html, script.js, styles.css)
app.use(express.static(path.join(__dirname)));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('user_data');
        const collection = database.collection('locations');

        console.log('Connected to MongoDB');

        // Route to save user location
        app.post('/save-location', async (req, res) => {
            const { name, phone, address, latitude, longitude } = req.body;

            if (!name || !phone || !address || !latitude || !longitude) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            try {
                const result = await collection.insertOne({
                    name,
                    phone,
                    address,
                    latitude,
                    longitude,
                    created_at: new Date(),
                });

                res.status(201).json({ message: 'Location saved successfully', data: result });
            } catch (err) {
                console.error('Error saving location:', err);
                res.status(500).json({ message: 'Failed to save location' });
            }
        });

        // Route to serve the HTML file at the root path
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'nest.html'));
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

run().catch(console.error);
