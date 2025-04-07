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
          required: true
        },
        skills: {
            type: String
        }
      },
      {
        Timestamps: true
});

const RegModel = mongoose.model("reg", RegSchema);
export default RegModel;