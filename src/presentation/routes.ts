import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { UserRouter } from "./user/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
