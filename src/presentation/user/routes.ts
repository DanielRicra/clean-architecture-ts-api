import { Router } from "express";
import { UserController } from "./controller";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware, CheckAdminOrOwnerMiddleware } from "../middlewares";

export class UserRouter {
  static get routes(): Router {
    const router = Router();

    const datasource = new UserDatasourceImpl();
    const repository = new UserRepositoryImpl(datasource);

    const controller = new UserController(repository);

    router.get("/", [AuthMiddleware.validateJwt], controller.getUsers);
    router.get("/:id", controller.getUser);
    router.patch(
      "/:id",
      [
        AuthMiddleware.validateJwt,
        CheckAdminOrOwnerMiddleware.checkAdminOrOwner,
      ],
      controller.updateUser
    );

    return router;
  }
}
