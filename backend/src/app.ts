import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/leads",
  leadRoutes
);

export default app;