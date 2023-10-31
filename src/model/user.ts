import mongoose, { Schema } from "mongoose";

export interface UserAttributes {
  fullname: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  address: string;
}

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
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

const User = mongoose.model<UserAttributes>("User", UserSchema);
export default User;
