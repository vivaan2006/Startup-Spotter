import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { spawn } from "child_process";
import startupRoutes from "./src/routes/startup";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mongo routes
app.use("/api/startups", startupRoutes);

// Reusable Python runner
const runPythonScript = (scriptPath: string, args: string[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    const python = spawn("python3", [scriptPath, ...args]);

    let stdout = "";
    let stderr = "";

    python.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    python.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        console.error("❌ Python error:", stderr);
        return reject(stderr);
      }
      try {
        const json = JSON.parse(stdout.trim());
        resolve(json);
      } catch (err) {
        console.error("❌ JSON parse error:", stdout);
        reject("Invalid JSON from Python");
      }
    });
  });
};

// === AGENT ENDPOINTS ===

// 1. Initialization route (runs initial_setup.py)
app.get("/api/initialize", async (req, res) => {
  const userId = (req.query.userId as string) || "anonymous";
  const scriptPath = path.join(__dirname, "python_scripts", "initial_setup.py");

  try {
    const result = await runPythonScript(scriptPath, [userId]);
    res.json(result);
  } catch (err) {
    console.error("❌ Init error:", err);
    res.status(500).json({ error: "Initialization failed" });
  }
});

// 2. Query route (runs query.py)
app.post("/api/query", async (req, res) => {
  const { sessionId, prompt } = req.body;
  const scriptPath = path.join(__dirname, "python_scripts", "query.py");

  try {
    const result = await runPythonScript(scriptPath, [sessionId, prompt]);
    res.json(result);
  } catch (err) {
    console.error("❌ Query error:", err);
    res.status(500).json({ error: "Query failed" });
  }
});

// === MongoDB ===
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
