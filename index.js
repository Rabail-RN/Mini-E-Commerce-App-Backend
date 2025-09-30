import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import quickcartRouter from './routes/quickcartRouter.js';
import connectDB from './config/connectDB.js';

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://mini-e-commerce-app-frontend-pe5eqb09k-rabail-nasirs-projects.vercel.app/",
  credentials: true
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send("Backend is running with MongoDB!");
});

// Add router here by importing it first
app.use("/quickcart", quickcartRouter);

if (!MONGO_URI) {
  console.error("MONGO_URI not found");
}

const startServer = async() => {
  const connected = await connectDB();

  if (connected) {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
  else {
    console.error("Database connection failed. Sever cannot be started.");
  }
};

startServer();