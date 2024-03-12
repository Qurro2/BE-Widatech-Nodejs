import salesService from "../service/sales-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await salesService.create(user, request);
    res.status(201).json({
      data: result,
      message: "Create Data Successfully",
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await salesService.get();
    res.status(200).json({
      data: result,
      message: "Get Data Successfully",
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const user = req.user;
    const dataId = parseInt(req.params.dataId);
    const result = await salesService.getById(user, dataId);
    res.status(200).json({
      data: result,
      message: "Get Data Successfully",
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const dataId = req.params.dataId;
    const request = req.body;
    request.id = dataId;

    const result = await salesService.update(user, request);
    res.status(200).json({
      data: result,
      message: "Update Data Successfully",
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const dataId = req.params.dataId;
    await salesService.remove(user, dataId);
    res.status(200).json({
      data: "Remove Successfuly",
    });
  } catch (e) {
    next(e);
  }
};

export default { create, get, update, remove, getById };
