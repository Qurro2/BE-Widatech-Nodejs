import productService from "../service/product-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const createDataProduct = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image: req.files["image"][0].filename,
    };
    const result = await productService.create(user, createDataProduct);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const productId = req.params.productId;
    const updateData = req.body;
    updateData.id = productId;
    if (req.files && req.files["image"] && req.files["image"][0]) {
      updateData.image = req.files["image"][0].filename;
    }
    const result = await productService.update(user, updateData);
    res.status(200).json({
      data: result,
      message: "Update Successfuly",
    });
  } catch (e) {
    next(e);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const result = await productService.getProduct();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
const getById = async (req, res, next) => {
  try {
    const user = req.user;
    const dataProductId = parseInt(req.params.dataProductId);
    const result = await productService.getById(user, dataProductId);
    res.status(200).json({
      data: result,
      message: "Get data Succesfuly",
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const productId = req.params.productId;
    await productService.remove(user, productId);
    res.status(200).json({
      data: "Delete Successfuly",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  update,
  getProduct,
  remove,
  getById,
};
