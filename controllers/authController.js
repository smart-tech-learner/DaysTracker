import { response } from "express";
import { UnAuthenticatedError } from "../errors/customErrors.js";
import UserModel from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import { StatusCodes } from "http-status-codes";

export const register = async (request, response) => {
  const hashedPassword = await hashPassword(request.body.password);
  console.log(hashedPassword);
  request.body.password = hashedPassword;
  const newUser = await UserModel.create(request.body);
  return response.status(StatusCodes.CREATED).json({ msg: newUser });
};

export const login = async (request, response) => {
  const user = await UserModel.findOne({ email: request.body.email });

  const isValidUser =
    user && (await comparePassword(request.body.password, user.password));

  if (!isValidUser) {
    throw new UnAuthenticatedError("invalid credentials");
  }

  const oneDay = 1000 * 60 * 60 * 24;
  const token = createJWT({ userId: user._id, role: user.role });

  response.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  return response.status(StatusCodes.OK).json({ msg: "user logged in" });
};

export const logout = (request, response) => {
  response.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return response.status(StatusCodes.OK).json({ msg: "user logged out" });
};
