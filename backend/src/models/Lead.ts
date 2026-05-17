import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface ILead
  extends Document {
  name: string;

  email: string;

  status: string;

  source: string;

  createdAt: Date;
}

const leadSchema =
  new Schema<ILead>(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      status: {
        type: String,

        enum: [
          "NEW",
          "CONTACTED",
          "QUALIFIED",
          "LOST",
        ],

        default: "NEW",
      },

      source: {
        type: String,

        enum: [
          "WEBSITE",
          "INSTAGRAM",
          "REFERRAL",
        ],

        default: "WEBSITE",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model<ILead>(
  "Lead",
  leadSchema
);