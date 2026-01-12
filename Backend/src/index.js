import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json()); // for JSON body
app.use(cors());

// Routes
app.use("/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

