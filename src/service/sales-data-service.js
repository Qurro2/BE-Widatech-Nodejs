import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";

const getDailySalesData = async () => {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const salesData = await prismaClient.salesdata.findMany({
    where: {
      date: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    select: {
      date: true,
      sales_person: true,
      amount_of_product: true,
    },
  });
  return salesData.map((data) => ({
    ...data,
    // Ambil hanya tanggal dari format ISO
    date: data.date.toISOString().split("T")[0],
  }));
};

const getWeeklySalesData = async () => {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - 7);
  const endOfWeek = new Date(currentDate);

  const weeklySalesData = await prismaClient.salesdata.findMany({
    where: {
      date: {
        gte: startOfWeek,
        lt: endOfWeek,
      },
    },
    select: {
      date: true,
      sales_person: true,
      amount_of_product: true,
    },
  });

  return weeklySalesData.map((data) => ({
    ...data,
    date: data.date.toISOString().split("T")[0],
  }));
};

const getMonthlySalesData = async () => {
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  console.log("startOfMonth:", startOfMonth);
  console.log("endOfMonth:", endOfMonth);

  const monthlySalesData = await prismaClient.salesdata.findMany({
    where: {
      date: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
    select: {
      date: true,
      sales_person: true,
      amount_of_product: true,
    },
  });

  return monthlySalesData.map((data) => ({
    ...data,
    date: data.date.toISOString().split("T")[0],
  }));
};

export default {
  getDailySalesData,
  getWeeklySalesData,
  getMonthlySalesData,
};
