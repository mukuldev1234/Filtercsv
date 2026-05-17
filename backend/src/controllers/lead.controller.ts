import {
  Request,
  Response,
} from "express";

import Lead from "../models/Lead";

export const createLead =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const lead =
        await Lead.create(
          req.body
        );

      res.status(201).json({
        success: true,

        message:
          "Lead created successfully",

        lead,
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

export const getLeads =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const page = Number(
        req.query.page
      ) || 1;

      const limit = 10;

      const skip =
        (page - 1) * limit;

      const search =
        req.query.search || "";

      const status =
        req.query.status || "";

      const source =
        req.query.source || "";

      // Sorting

      const sort =
        req.query.sort ===
        "oldest"
          ? 1
          : -1;

      // Filters

      const filter: any = {};

      if (search) {
        filter.$or = [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },

          {
            email: {
              $regex: search,
              $options: "i",
            },
          },
        ];
      }

      if (status) {
        filter.status =
          status;
      }

      if (source) {
        filter.source =
          source;
      }

      const leads =
        await Lead.find(filter)
          .sort({
            createdAt: sort,
          })
          .skip(skip)
          .limit(limit);

      const total =
        await Lead.countDocuments(
          filter
        );

      res.status(200).json({
        success: true,

        leads,

        totalPages:
          Math.ceil(
            total / limit
          ),

        currentPage: page,
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

export const updateLead =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const lead =
        await Lead.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,

        message:
          "Lead updated successfully",

        lead,
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

export const deleteLead =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      await Lead.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,

        message:
          "Lead deleted successfully",
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