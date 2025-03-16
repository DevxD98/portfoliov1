const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Add debugging
console.log('Current directory:', __dirname);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: "Backend is working!" });
});

const startServer = async (port) => {
    try {
        await new Promise((resolve, reject) => {
            const server = app.listen(port)
                .once('listening', () => {
                    console.log(`Server running on port ${port}`);
                    resolve();
                })
                .once('error', (err) => {
                    if (err.code === 'EADDRINUSE') {
                        console.log(`Port ${port} is busy, trying ${port + 1}...`);
                        server.close();
                        startServer(port + 1);
                    } else {
                        console.error('Error starting server:', err);
                        reject(err);
                    }
                });
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

const PORT = process.env.PORT || 5000;
startServer(PORT);
