import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fronturl: {
      type: String,
      required: true,
    },
   }
);

export const AccessControl = mongoose.model("AccessControl", schema);
