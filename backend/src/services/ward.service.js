const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getWards = async () => {
  const data = await prisma.ward.findMany({
    where: {
      is_deleted: false,
    },
    include: {
      district: true,
    },
  });
  const count = await prisma.ward.count();
  return { count, data };
};

const getWardById = async (id) => {
  const data = await prisma.ward.findUnique({
    where: {
      id: parseInt(id, 10),
    },
    include: {
      district: true,
    },
  });
  return data;
};

const createWard = async (body) => {
  return 0;
};

const updateWard = async (id, body) => {
  return 0;
};

const deleteWard = async (id) => {
  const data = await prisma.ward.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      is_deleted: true,
    },
  });
  return data;
};

module.exports = {
  getWards,
  getWardById,
  createWard,
  updateWard,
  deleteWard,
};
