import mongoose from "mongoose";
import { GENDERS, ROLES } from "../utils/constants.js";

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    gender: {
      type: String,
      enum: Object.values(GENDERS),
    },
    dob: Date,
    password: String,
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Users", UserSchema);
