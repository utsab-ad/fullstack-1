import mongoose from "mongoose";

const RegSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    skills: {
      type: [String], // Now supports multiple skills like ["HTML", "CSS", "React"]
      default: [],
    },
  },
  {
    timestamps: true, // ✅ Correct spelling
  }
);

const RegModel = mongoose.models.reg || mongoose.model("reg", RegSchema);
export default RegModel;
