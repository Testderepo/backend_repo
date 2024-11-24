import cors from "cors";
import express from "express";
import userRoutes from "../routes/userRoutes";

const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // URL frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Tambahkan Authorization
  })
);

// Routes
app.use("/api", userRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
