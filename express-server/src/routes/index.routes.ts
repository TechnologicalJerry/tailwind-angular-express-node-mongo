import { Express } from "express";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";
import productRoutes from "./product.routes";

function routes(app: Express) {
  // API Routes
  app.use("/api/users", userRoutes);
  app.use("/api/sessions", sessionRoutes);
  app.use("/api/products", productRoutes);
}

export default routes;
