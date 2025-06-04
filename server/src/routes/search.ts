import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { query } = req.body;
  console.log("Received search:", query);

  // Do something with the query (e.g., search DB)
  res.json({ message: `You searched for '${query}'` });
});

export default router;
