import salesDataService from "../service/sales-data-service.js";

const getDailySales = async (req, res, next) => {
  try {
    const dailySalesData = await salesDataService.getDailySalesData();
    res.status(200).json({
      data: dailySalesData,
    });
  } catch (e) {
    next(e);
  }
};

const getWeeklySales = async (req, res, next) => {
  try {
    const weeklySalesData = await salesDataService.getWeeklySalesData();
    res.status(200).json({
      data: weeklySalesData,
    });
  } catch (e) {
    next(e);
  }
};

const getMonthlySales = async (req, res, next) => {
  try {
    const monthlySalesData = await salesDataService.getMonthlySalesData();
    res.status(200).json({
      data: monthlySalesData,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  getDailySales,
  getWeeklySales,
  getMonthlySales,
};
