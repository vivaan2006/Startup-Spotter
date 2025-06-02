import mongoose from "mongoose";

const StartupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String },
  tags: [String],
  summary: String,
  source: String
});

export default mongoose.model("Startup", StartupSchema);
