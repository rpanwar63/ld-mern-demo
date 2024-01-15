import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/user", proxy("http://localhost:8001"));
app.use("/api/post", proxy("http://localhost:8002"));
app.use("/api/comment", proxy("http://localhost:8003"));
app.use("/api/notify", proxy("http://localhost:8004"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
