import { RequestHandler } from "express";
import { JwtAdapter } from "../../config";
import prisma from "../../data/sqlite/sqlite-database";

export class AuthMiddleware {
  static validateJwt: RequestHandler = async (
    req,
    res,
    next
  ): Promise<void> => {
    const authorization = req.header("Authorization");

    if (!authorization) {
      res.status(400).json({ error: "No token was provided" });
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      res.status(401).json({ error: "Invalid Bearer token" });
      return;
    }

    const token = authorization.split(" ").at(1) ?? "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);

      if (!payload) {
        res.status(401).json({ error: "Invalid token" });
        return;
      }

      const user = await prisma.user.findFirst({ where: { id: payload.id } });

      if (!user) {
        res.status(401).json({ error: "User not found" });
        return;
      }

      req.body.user = user;
      next();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
