const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// get all
const getAll = async () => {
  const data = await prisma.spot_type.findMany({
    where: {
      is_deleted: false,
    },
    orderBy: {
      id: 'asc',
    },
  });
  return data;
};

// get a adsPanel by id
const getById = async (id) => {
  const data = await prisma.spot_type.findUnique({
    where: {
      is_deleted: false,
      id: parseInt(id, 10),
    },
  });
  return data;
};

// create
const create = async (body) => {
  const data = await prisma.spot_type.create({
    data: {
      name: body.name,
    },
  });

  return data;
};

// update an existing adsPanel
const update = async (id, body) => {
  const data = await prisma.spot_type.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      name: body.name,
    },
  });

  return data;
};

// delete an existing adsPanel
const deleteSpotType = async (id) => {
  const data = await prisma.spot_type.update({
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
  getAll,
  getById,
  create,
  update,
  deleteSpotType,
};
