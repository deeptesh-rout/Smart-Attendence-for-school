const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

// Server & Database Connection (local dev)
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log('🔑 SESSION_SECRET:', process.env.SESSION_SECRET ? 'Loaded ✅' : 'Missing ❌');
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

startServer();
