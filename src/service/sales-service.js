import { prismaClient } from "../app/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import {
  createDataSales,
  updateDataSales,
  getDataSales,
} from "../validation/sales-validation.js";

const removeTimeFromDate = (dateString) => {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date;
};

const create = async (user, request) => {
  const input = validate(createDataSales, request);
  input.sales_person = user.name;

  return prismaClient.salesdata.create({
    data: input,
    select: {
      id: true,
      date: true,
      customer: true,
      payment: true,
      amount_of_product: true,
      notes: true,
    },
  });
};
const get = async () => {
  const getData = await prismaClient.salesdata.findMany({
    select: {
      id: true,
      date: true,
      customer: true,
      sales_person: true,
      payment: true,
      amount_of_product: true,
      notes: true,
    },
  });
  if (!getData) throw new ResponseError(404, "Data Not Found");

  const formattedData = getData.map((data) => ({
    ...data,

    date: data.date.toISOString().split("T")[0],
  }));

  return formattedData;
};

const getById = async (user, dataSalesId) => {
  validate(getDataSales, dataSalesId);
  const result = await prismaClient.salesdata.findFirst({
    where: {
      id: dataSalesId,
      sales_person: user.name,
    },
    select: {
      id: true,
      date: true,
      customer: true,
      payment: true,
      amount_of_product: true,
      notes: true,
    },
  });
  if (!user) throw new ResponseError(404, "Unauthorized");
  if (!result) throw new ResponseError(404, "Data Not Found");

  return result;
};

const update = async (user, request) => {
  const dataSales = validate(updateDataSales, request);
  const totalData = await prismaClient.salesdata.count({
    where: {
      id: dataSales.id,
      sales_person: user.name,
    },
  });
  if (totalData !== 1) throw new ResponseError(404, "Data Not Found");

  if (dataSales.date) {
    dataSales.date = removeTimeFromDate(dataSales.date);
  }

  return prismaClient.salesdata.update({
    where: {
      id: dataSales.id,
    },
    data: {
      date: dataSales.date,
      customer: dataSales.customer,
      payment: dataSales.payment,
      amount_of_product: dataSales.amount_of_product,
      notes: dataSales.notes,
    },
    select: {
      id: true,
      date: true,
      amount_of_product: true,
      customer: true,
      payment: true,
      notes: true,
    },
  });
};

const remove = async (user, dataId) => {
  dataId = validate(getDataSales, dataId);
  const totalData = await prismaClient.salesdata.count({
    where: {
      id: dataId,
    },
  });
  if (totalData !== 1) throw new ResponseError(404, "Data Not Found");
  return prismaClient.salesdata.delete({
    where: {
      id: dataId,
    },
  });
};

export default { create, get, update, remove, getById };
