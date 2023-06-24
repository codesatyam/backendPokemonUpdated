import express from "express";
import userRouter from "./routes/user.js";
import pokemonRouter from "./routes/pokemon.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import cron from "node-cron";
import {decreaseHealthStatus} from "./controllers/decreasehealth.js";

export const app = express();

config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/pokemon", pokemonRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

cron.schedule('* * * * *', decreaseHealthStatus);
// Using Error Middleware
app.use(errorMiddleware);
