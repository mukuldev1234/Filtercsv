import {
  body,
} from "express-validator";

export const leadValidation =
  [
    body("name")
      .notEmpty()
      .withMessage(
        "Name required"
      ),

    body("email")
      .isEmail()
      .withMessage(
        "Valid email required"
      ),

    body("status")
      .notEmpty()
      .withMessage(
        "Status required"
      ),

    body("source")
      .notEmpty()
      .withMessage(
        "Source required"
      ),
  ];