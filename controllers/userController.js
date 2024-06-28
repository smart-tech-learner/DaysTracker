import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
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

  if (!user) throw new BadRequestError("user not found");

  const oldPasswordMatches = await comparePassword(oldPassword, user.password);

  if (!oldPasswordMatches)
    throw new BadRequestError("incorrect old password entered");

  if (oldPassword === newPassword)
    throw new BadRequestError(
      "old password cannot be same as the the new password."
    );

  if (newPassword !== confirmNewPassword)
    throw new BadRequestError(
      "new password and confirm new password does not match"
    );

  const hashedNewPassword = await hashPassword(newPassword);

  await UserModel.findByIdAndUpdate(user._id, {
    password: hashedNewPassword,
  });

  return response
    .status(StatusCodes.OK)
    .json({ msg: "password updated successfully" });
};

export const resetUserPassword = async (request, response) => {
  const { email, newPassword, confirmNewPassword } = request.body;

  if (newPassword !== confirmNewPassword) {
    throw new BadRequestError(
      "new password and confirm new password does not match"
    );
  }

  const user = await UserModel.findOne({ email });

  if (!user) throw new BadRequestError("user not found");

  const hashedNewPassword = await hashPassword(newPassword);

  await UserModel.findByIdAndUpdate(user._id, {
    password: hashedNewPassword,
  });

  return response
    .status(StatusCodes.OK)
    .json({ msg: "password updated successfully" });
};
