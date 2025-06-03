import express from "express";
import Startup from "../../models/Startup";

const router = express.Router();

// Get all startups
router.get("/", async (_, res) => {
  const startups = await Startup.find();
  res.json(startups);
});

// Create a new startup
router.post("/", async (req, res) => {
  try {
    const startup = new Startup(req.body);
    await startup.save();
    res.status(201).json(startup);
  } catch (error) {
    res.status(400).json({ error: "Error creating startup", details: error });
  }
});

export default router;
