import Joi from "joi";

const userRegisterValidation = Joi.object({
  photo: Joi.string().max(255).required(),
  email: Joi.string().email().min(4).max(255).required(),
  password: Joi.string().min(8).max(16).required(),
  name: Joi.string().min(4).max(255).required(),
});

const userLoginValidation = Joi.object({
  email: Joi.string().email().min(4).max(255).required(),
  password: Joi.string().min(8).max(16).required(),
});

const getUserValidation = Joi.string().max(255).required();

const userUpdateValidation = Joi.object({
  email: Joi.string().email().max(255).required(),
  name: Joi.string().max(255).optional(),
  password: Joi.string().min(8).max(255).required(),
  newPassword: Joi.string().min(8).max(255).optional(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .when("newPassword", {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .label("Confirm Password")
    .messages({ "any.only": "Confirm password must match password" }),
});
export {
  userRegisterValidation,
  userLoginValidation,
  getUserValidation,
  userUpdateValidation,
};
