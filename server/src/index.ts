import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { connectDB, AppRoutes } from "./imports";

config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

AppRoutes(app);

connectDB();

app.listen(PORT, () =>
  console.log(`Server is running on port: http://localhost:${PORT}`)
);
