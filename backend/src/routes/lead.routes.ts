import express from "express";

import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller";

import authMiddleware from "../middlewares/auth.middleware";

import roleMiddleware from "../middlewares/role.middleware";

import validationMiddleware from "../middlewares/validation.middleware";

import {
  leadValidation,
} from "../validations/lead.validation";

const router =
  express.Router();

router.get(
  "/",
  authMiddleware,
  getLeads
);

router.post(
  "/",
  authMiddleware,

  roleMiddleware([
    "ADMIN",
    "SALES",
  ]),

  leadValidation,

  validationMiddleware,

  createLead
);

router.put(
  "/:id",
  authMiddleware,

  roleMiddleware([
    "ADMIN",
    "SALES",
  ]),

  leadValidation,

  validationMiddleware,

  updateLead
);

router.delete(
  "/:id",
  authMiddleware,

  roleMiddleware([
    "ADMIN",
  ]),

  deleteLead
);

export default router;