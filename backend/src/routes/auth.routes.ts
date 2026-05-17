import express from "express";

import {
  register,
  login,
} from "../controllers/auth.controller";

import validationMiddleware from "../middlewares/validation.middleware";

import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation";

const router =
  express.Router();

router.post(
  "/register",
  registerValidation,
  validationMiddleware,
  register
);

router.post(
  "/login",
  loginValidation,
  validationMiddleware,
  login
);

export default router;