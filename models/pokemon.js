import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    hp: {
      type: Number,
      required: true,
    },
    moves: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
    },
    attack: {
      type: Number,
    },
    defense: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    lastFed: {
      type: Number,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { 
    timestamps: true
   }
);
schema.index({ id: 1, user: 1 }, { unique: true });

export const Pokemon = mongoose.model("Pokemon", schema);
