import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import initializeRoutes from "./routes";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Express app
const app: Application = express();

// Middleware
app.use(express.json());

const isDevelopment = process.env.NODE_ENV !== "production";

if (isDevelopment) {
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
  );
} else {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
}

// Routes
initializeRoutes(app);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
