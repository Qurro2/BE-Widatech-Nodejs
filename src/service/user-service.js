import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  userRegisterValidation,
  userLoginValidation,
  getUserValidation,
  userUpdateValidation,
} from "../validation/user-validation.js";
import bcrypt from "bcrypt";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const user = validate(userRegisterValidation, request);
  user.password = await bcrypt.hash(user.password, 10);

  if (!user.email || !user.name || !user.photo)
    throw new ResponseError(401, "Please input email and name");
  return prismaClient.user.create({
    data: user,
    select: {
      email: true,
      name: true,
      photo: true,
    },
  });
};

const login = async (request) => {
  const loginValidate = validate(userLoginValidation, request);
  const user = await prismaClient.user.findUnique({
    where: {
      email: loginValidate.email,
    },
    select: {
      email: true,
      password: true,
    },
  });

  if (!user) throw new ResponseError(401, "Email tidak terdaftar");

  const passwordValid = await bcrypt.compare(
    loginValidate.password,
    user.password
  );
  if (!passwordValid) throw new ResponseError(401, "Password is wrong");
  if (!user && !passwordValid == null)
    throw new ResponseError(400, "Input email and password");

  const token = uuid();
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      email: user.email,
    },
    select: {
      token: true,
    },
  });
};

const get = async (email) => {
  email = validate(getUserValidation, email);
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      name: true,
      photo: true,
    },
  });
  if (!user) throw new ResponseError(404, "User Not Found");
  return user;
};

const logout = async (email) => {
  email = validate(getUserValidation, email);
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) throw new ResponseError(404, "User Not Found");

  return prismaClient.user.update({
    where: {
      email: email,
    },
    data: {
      token: null,
    },
    select: {
      email: true,
    },
  });
};
const update = async (request) => {
  const user = validate(userUpdateValidation, request);
  const totalData = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });
  if (totalData !== 1) throw new ResponseError(404, "Data Not Found");

  const userData = await prismaClient.user.findUnique({
    where: {
      email: user.email,
    },
  });
  const isPasswordValid = await bcrypt.compare(
    user.password,
    userData.password
  );
  if (!isPasswordValid)
    throw new ResponseError(400, "Old password is not valid");
  const data = {};
  if (user.name) {
    data.name = user.name;
  }
  if (user.newPassword && user.confirmPassword) {
    if (user.newPassword !== user.confirmPassword) {
      throw new ResponseError(400, "Confirm password is not same new password");
    }
    data.password = await bcrypt.hash(user.newPassword, 10);
  }
  const updateUser = await prismaClient.user.update({
    where: { email: user.email },
    data: data,
    select: {
      email: true,
      name: true,
    },
  });
  return updateUser;
};

export default {
  register,
  login,
  get,
  logout,
  update,
};
