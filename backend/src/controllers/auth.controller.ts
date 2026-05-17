import {
  Request,
  Response,
} from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/User";

export const register =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      // Check existing user

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {
        return res
          .status(400)
          .json({
            message:
              "User already exists",
          });
      }

      // Hash password

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // Default role

      let role = "SALES";

      // Admin account

      if (
        email ===
        "vermamukul@gmail.com"
      ) {
        role = "ADMIN";
      }

      // Create user

      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
          role,
        });

      res.status(201).json({
        success: true,

        message:
          "User registered successfully",

        user: {
          id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Server Error",
      });
    }
  };

export const login =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        email,
        password,
      } = req.body;

      // Find user

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Invalid credentials",
          });
      }

      // Compare password

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Invalid credentials",
          });
      }

      // Generate JWT

      const token =
        jwt.sign(
          {
            id: user._id,

            role: user.role,
          },

          process.env
            .JWT_SECRET as string,

          {
            expiresIn: "7d",
          }
        );

      res.status(200).json({
        success: true,

        message:
          "Login successful",

        token,

        user: {
          id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Server Error",
      });
    }
  };