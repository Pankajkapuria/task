import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from '../routes/user.route.js';
import authRoutes from '../routes/auth.route.js';
import postRoutes from '../routes/post.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

// Initialize express app
const app = express();

// Enable CORS at the top
app.use(cors({
  origin: 'https://task-kappa-sooty.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: 'abc.env' });
}

console.log("OK");

// MongoDB connection setup
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log('MongoDb connection error:', err);
  });

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);


// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

export default app;
