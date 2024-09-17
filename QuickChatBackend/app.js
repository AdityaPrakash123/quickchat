import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './server/config/db.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

app.listen(PORT, () => {
  console.log(`Your api is running at https://localhost:${PORT}`);
});
