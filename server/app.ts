// app.ts

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import startupRoutes from "./src/routes/startup";

dotenv.config();  // ← loads PORT and MONGO_URI from server/.env

const app = express();

// 1) Enable CORS so your React app at http://localhost:5173 can hit this API
app.use(cors());

// 2) Parse JSON bodies
app.use(express.json());

// 3) HTTP request logger
app.use(morgan('dev'));

// 4) Connect to MongoDB Atlas using MONGO_URI from .env
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ MongoDB (Atlas) connected');

    // 5) Mount your API routes only after DB connection
    app.use("/api/startups", startupRoutes);

    // 6) Root route
    app.get('/', (_req: Request, res: Response) => {
      console.log('↪  Hit GET /');
      res.status(200).send('✅ OK – root is reachable');
    });

    // 7) 404 handler for unhandled routes
    app.use((_req, res) => {
      res.status(404).json({ error: 'Not Found' });
    });

    // 8) Start server
    const PORT = parseInt(process.env.PORT || '5000', 10);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });