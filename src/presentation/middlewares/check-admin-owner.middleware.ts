import { RequestHandler } from "express";
import { UserEntity } from "../../domain";

export class CheckAdminOrOwnerMiddleware {
  static checkAdminOrOwner: RequestHandler = async (
    req,
    res,
    next
  ): Promise<void> => {
    const user = req.body.user as undefined | UserEntity;
    if (
      user &&
      (user.roles.some((role) => role.name === "ADMIN") ||
        user.id === req.params.id)
    ) {
      next();
    } else {
      res.status(403).json({ error: "Permission denied" });
      return;
    }
  };
}
