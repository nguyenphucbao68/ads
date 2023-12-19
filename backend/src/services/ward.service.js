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
    orderBy: {
      updated_at: 'desc',
    },
  });
  return data;
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
  const data = await prisma.ward.create({
    data: {
      name: body.name,
      district_id: body.district_id,
    },
  });
  return data;
};

const updateWard = async (id, body) => {
  const data = await prisma.ward.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      name: body.name,
      district_id: body.district_id,
      updated_at: new Date(),
    },
    include: {
      district: true,
    },
  });
  return data;
};

const deleteWard = async (id) => {
  const data = await prisma.ward.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      is_deleted: true,
      updated_at: new Date(),
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
