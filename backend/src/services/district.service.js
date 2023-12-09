const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getDistricts = async (body) => {
  return { count: 0, data: [] };
};

module.exports = {
  getDistricts,
};
