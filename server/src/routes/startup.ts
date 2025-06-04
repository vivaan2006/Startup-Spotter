import express from "express";
import Startup from "../models/Startup";
import { generateWithVertex } from "../utils/vertex";

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
    const { name, website, budget, location } = req.body;
    const apiKey = process.env.VERTEX_API_KEY || "";

    let summary = "";
    let tags: string[] = [];
    if (apiKey) {
      const prompt = `Business idea: ${name}\nBudget: ${budget || "n/a"}\nLocation: ${location || "n/a"}\nProvide output as:\nSummary: <short summary>\nTags: <comma separated tags>`;
      const generated = await generateWithVertex(prompt, apiKey);
      summary = generated.summary;
      tags = generated.tags;
    }

    const startup = new Startup({ name, website, summary, tags });
    await startup.save();
    res.status(201).json(startup);
  } catch (err) {
    res.status(400).json({ error: "Failed to create startup", details: err });
  }
});

export default router;
