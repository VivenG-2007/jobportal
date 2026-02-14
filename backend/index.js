import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config();
import userRoute from "./routes/user.route.js";

const app = express()

// middlewires
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}

app.use(cors(corsOptions))


const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
// http://localhost:8000/api/v1/user/register
// http://localhost:8000/api/v1/user/login
// http://localhost:8000/api/v1/user/logout
// http://localhost:8000/api/v1/user/profile/update

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`)
})