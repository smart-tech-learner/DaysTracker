import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import { NotFoundError } from "../errors/customErrors.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

export const getCurrentUser = async (request, response) => {
  const user = await UserModel.findOne({ _id: request.user.userId });

  const userWithoutPassword = user.toJSON();

  if (!user) throw new NotFoundError("No user found");

  return response.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateUserPassword = async (request, response) => {
  const { oldPassword, newPassword, confirmNewPassword } = request.body;
  const user = await UserModel.findOne({ _id: request.user.userId });

  const oldPasswordMatches = await comparePassword(oldPassword, user.password);

  if (!oldPasswordMatches) throw new Error("incorrect old password entered");

  if (oldPassword === newPassword)
    throw new Error("old password cannot be same as the the new password.");

  if (newPassword !== confirmNewPassword)
    throw new Error("new password and confirm new password are not same.");

  const hashedNewPassword = await hashPassword(newPassword);

  await UserModel.findByIdAndUpdate(user._id, {
    password: hashedNewPassword,
  });

  return response
    .status(StatusCodes.OK)
    .json({ msg: "password updated successfully" });
};
