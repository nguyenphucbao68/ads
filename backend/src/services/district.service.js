const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getDistricts = async () => {
  const data = await prisma.district.findMany({
    where: {
      is_deleted: false,
    },
  });
  const count = await prisma.district.count();
  return { count, data };
};

const getDistrictById = async (id) => {
  const data = await prisma.district.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return data;
};

const createDistrict = async (body) => {
  return 0;
};

const updateDistrict = async (id, body) => {
  return 0;
};
const getWards = async (limit, page)=>{
  return 0;
}

const deleteDistrict = async (id) => {
  const data = await prisma.district.update({
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
  getDistricts,
  getDistrictById,
  createDistrict,
  updateDistrict,
  deleteDistrict,
  getWards,
};
