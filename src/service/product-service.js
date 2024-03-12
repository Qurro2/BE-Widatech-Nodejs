import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import {
  createProduct,
  updateProduct,
  getDataProduct,
} from "../validation/product-validation.js";

const create = async (user, request) => {
  const createValidation = validate(createProduct, request);
  createValidation.sales = user.name;

  return prismaClient.product.create({
    data: createValidation,
    select: {
      id: true,
      name: true,
      image: true,
      stock: true,
      price: true,
    },
  });
};

const update = async (user, request) => {
  const productData = validate(updateProduct, request);
  const totalData = await prismaClient.product.count({
    where: {
      id: productData.id,
      sales: user.name,
    },
  });
  if (totalData !== 1) throw new ResponseError(404, "Data Product Not Found");

  return prismaClient.product.update({
    where: {
      id: productData.id,
    },
    data: {
      image: productData.image,
      name: productData.name,
      stock: productData.stock,
      price: productData.price,
    },
    select: {
      id: true,
      name: true,
      image: true,
      stock: true,
      price: true,
    },
  });
};

const getProduct = async () => {
  const product = await prismaClient.product.findMany({
    select: {
      id: true,
      image: true,
      name: true,
      price: true,
      stock: true,
    },
  });
  if (!product) throw new ResponseError(404, "Data Product Not Found");
  return product;
};

const getById = async (user, dataProductId) => {
  validate(getDataProduct, dataProductId);
  const result = await prismaClient.product.findFirst({
    where: {
      id: dataProductId,
      sales: user.name,
    },
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
      stock: true,
    },
  });
  if (!user) throw new ResponseError(403, "You are Not User");
  if (!result) throw new ResponseError(404, "Data Not Found");
  return result;
};

const remove = async (user, productId) => {
  productId = validate(getDataProduct, productId);
  const totalData = await prismaClient.product.count({
    where: {
      id: productId,
    },
  });
  if (totalData !== 1) throw new ResponseError(404, "Data Not Found");
  return prismaClient.product.delete({
    where: {
      id: productId,
    },
  });
};

export default { create, update, getProduct, remove, getById };
