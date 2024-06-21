import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import { NotFoundError } from "../errors/customErrors.js";

export const getCurrentUser = async (request, response) => {
  const user = await UserModel.findOne({ _id: request.user.userId });

  const userWithoutPassword = user.toJSON();

  if (!user) throw new NotFoundError("No user found");

  return response.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
