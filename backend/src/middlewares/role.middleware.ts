import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: any;
}

const roleMiddleware = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // 🔒 safety check
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - No user found",
        });
      }

      // 🔒 role missing check
      if (!req.user?.role) {
        return res.status(401).json({
          success: false,
          message: "User role missing",
        });
      }

      // 🔒 role validation
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access Denied",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Role middleware error",
      });
    }
  };
};

export default roleMiddleware;