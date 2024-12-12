import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { User } from "../user.entity";

declare global {
  namespace Express {
    interface Request {
      currentUser?: User | null;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      try {
        // Await the Promise to get the resolved User object
        const user = await this.usersService.findOne(userId); 
        req.currentUser = user || null; // Assign resolved user or null
      } catch (error) {
        console.error("Error fetching current user:", error);
        req.currentUser = null; // Handle error gracefully
      }
    }

    next();
  }
}
