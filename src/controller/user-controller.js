import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const createUser = {
      email: email,
      password: password,
      name: name,
      photo: req.files["photo"][0].filename,
    };
    const result = await userService.register(createUser);
    res.status(201).json({
      data: result,
      message: "Register successfully",
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      data: result,
      message: "Login successfully",
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const email = req.user.email;
    const result = await userService.get(email);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.email);
    res.status(200).json({
      data: "Logout Succesfuly",
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const email = req.user.email;
    const request = req.body;
    request.email = email;
    const result = await userService.update(request);
    res.status(200).json({
      data: result,
      message: "Update succesfully",
    });
  } catch (e) {
    next(e);
  }
};
export default {
  register,
  login,
  get,
  logout,
  update,
};
