import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import connectDB from "./config/database";
import cors from "cors";

const app = express();

connectDB();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));

app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

export default app;