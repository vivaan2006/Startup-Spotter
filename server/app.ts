import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import startupRoutes from "./routes/startup";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/startups", startupRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");

    // Start the server once DB is connected
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
