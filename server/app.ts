// app.ts

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

import startupRoutes from "./src/routes/startup";
import searchRoutes from "./src/routes/search";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URI || '', {})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use("/api/startup", startupRoutes);
app.use("/api/search", searchRoutes);

const AGENT_SERVER_URL = 'http://127.0.0.1:8000';


app.post("/api/start_session", async (req, res) => {
  const { user_id } = req.body;

  try {
    const response = await axios.post(`${AGENT_SERVER_URL}/start_session`, { user_id });
    res.json(response.data);
  } catch (err) {
    console.error('❌ Error starting session:', err);
    res.status(500).json({ error: 'Failed to start session' });
  }
});

app.post("/api/run_agent", async (req, res) => {
  const { session_id, user_input } = req.body;

  try {
    const response = await axios.post(`${AGENT_SERVER_URL}/run_agent`, {
      session_id,
      user_input
    });
    res.json(response.data);
  } catch (err) {
    console.error('❌ Error running agent:', err);
    res.status(500).json({ error: 'Failed to run agent' });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Express server is running.");
});

export default app;
