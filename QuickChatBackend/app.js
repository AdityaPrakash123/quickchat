import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './server/config/db.js';
import mainRoute from './server/routes/main.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(mainRoute);

connectDB();

app.listen(PORT, () => {
  console.log(`Your api is running at http://localhost:${PORT}`);
});
