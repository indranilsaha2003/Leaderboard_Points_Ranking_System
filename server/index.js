import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import claimRoutes from './routes/claims.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/points-ranking';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    initializeDefaultUsers();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Initialize default users
async function initializeDefaultUsers() {
  try {
    const { default: User } = await import('./models/User.js');
    const userCount = await User.countDocuments();
    
    if (userCount === 0) {
      const defaultUsers = [
        'Rahul', 'Kamal', 'Sanak', 'Priya', 'Amit', 
        'Neha', 'Ravi', 'Sneha', 'Arjun', 'Kavya'
      ];
      
      const users = defaultUsers.map(name => ({ 
        name, 
        totalPoints: Math.floor(Math.random() * 1000),
        avatarUrl: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000) + 1000000}/pexels-photo-${Math.floor(Math.random() * 1000000) + 1000000}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`
      }));
      
      await User.insertMany(users);
      console.log('Default users created');
    }
  } catch (error) {
    console.error('Error initializing users:', error);
  }
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/claims', claimRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Serve static files from dist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
