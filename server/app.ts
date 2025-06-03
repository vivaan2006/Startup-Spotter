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

app.use("/api/startups", startupRoutes);


// 3) HTTP request logger
app.use(morgan('dev'));

// 4) Connect to MongoDB Atlas using MONGO_URI from .env
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ MongoDB (Atlas) connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// 5) Sanity‐check root route
app.get('/', (_req: Request, res: Response) => {
  console.log('↪  Hit GET /');
  res.status(200).send('✅ OK – root is reachable');
});

// 6) (Optional) Mount your API routers here, for example:
// import userRouter from './routes/user';
// app.use('/api/users', userRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// 7) Listen on the port specified in .env (PORT=5000)
const PORT = parseInt(process.env.PORT || '5000', 10);
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
