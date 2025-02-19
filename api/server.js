import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors'

const app = express();
import cors from 'cors';

app.use(cors({
  origin: 'https://task-kappa-sooty.vercel.app', // Allow specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true // Include cookies if needed
}));


app.options('*', cors());


if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "abc.env" });
}

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log('MongoDb connection error:5', err);
  });

const __dirname = path.resolve();



app.use(express.json());
app.use(cookieParser());

app.listen(3100, () => {
  console.log('Server is running on port 3100!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
