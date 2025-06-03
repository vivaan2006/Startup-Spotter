import express from "express";
import Startup from "../models/Startup";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("↪ Hit GET /api/startups");
  try {
    const startups = await Startup.find();
    res.json(startups);
  } catch (err) {
    res.status(500).json({ error: "Database fetch failed" });
  }
});

router.post("/", async (req, res) => {
  try {
    const startup = new Startup(req.body);
    await startup.save();
    res.status(201).json(startup);
  } catch (err) {
    res.status(400).json({ error: "Failed to create startup", details: err });
  }
});

export default router;
