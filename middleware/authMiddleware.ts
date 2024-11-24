import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const token = req.headers.authorization;
  
    if (!token || !token.startsWith("Bearer ") || token.split(" ")[1] !== "secret") {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    next();
  };
  
