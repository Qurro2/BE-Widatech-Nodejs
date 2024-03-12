import Joi from "joi";

const createProduct = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  image: Joi.string().max(255).optional(),
  stock: Joi.number().integer().min(1).max(255).required(),
  price: Joi.number().positive().required(),
});

const updateProduct = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().min(3).max(255).optional(),
  image: Joi.string().max(255).optional(),
  stock: Joi.number().integer().min(1).max(255).optional(),
  price: Joi.number().positive().optional(),
});

const getDataProduct = Joi.number().positive().required();

export { createProduct, updateProduct, getDataProduct };
