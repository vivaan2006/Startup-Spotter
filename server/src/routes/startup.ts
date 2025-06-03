import express from "express";
import Startup from "../models/Startup";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const startups = await Startup.find();
    res.json(startups);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch startups" });
  }
});

export default router;
