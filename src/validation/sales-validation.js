import Joi from "joi";

const createDataSales = Joi.object({
  date: Joi.date().required(),
  customer: Joi.string().min(5).max(255).required(),
  payment: Joi.string().min(3).max(255).required(),
  notes: Joi.string().min(3).max(1500).required(),
  amount_of_product: Joi.number().integer().min(1).max(1500).required(),
});

const updateDataSales = Joi.object({
  id: Joi.number().positive().required(),
  date: Joi.date().optional(),
  customer: Joi.string().min(5).max(255).optional(),
  payment: Joi.string().min(3).max(255).optional(),
  notes: Joi.string().min(3).max(1500).optional(),
  amount_of_product: Joi.number().integer().min(1).max(1500).optional(),
});

const getDataSales = Joi.number().positive().required();

export { createDataSales, updateDataSales, getDataSales };
