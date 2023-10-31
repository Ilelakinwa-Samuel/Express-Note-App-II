import mongoose, { Schema } from "mongoose";
import { UserAttributes } from "./user";

export interface NoteAttributes {
  title: string;
  description: string;
  duedate: string;
  status: string;
  userId: UserAttributes | any;
}

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duedate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id, delete ret.password, delete ret.__v;
      },
    },
  }
);

const Note = mongoose.model<NoteAttributes>("Note", NoteSchema);

export default Note;
