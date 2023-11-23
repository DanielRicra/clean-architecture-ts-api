import { RequestHandler } from "express";
import prisma from "../../data/sqlite/sqlite-database";

export class UserController {
  getUsers: RequestHandler = (req, res) => {
    prisma.user
      .findMany()
      .then((users) => res.json({ users }))
      .catch((error) =>
        res.status(500).json({ error: "Server internal error" })
      );
  };
}
