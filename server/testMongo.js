const path = require('path'); // Add this line

require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');

console.log('Testing connection with:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ MongoDB connected successfully!");
    process.exit(0);
})
.catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
});