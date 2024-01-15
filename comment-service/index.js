import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import commentRoutes from "./src/routes/commentRoutes.js";

const port = process.env.PORT || 8003;

connectDB();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(commentRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
