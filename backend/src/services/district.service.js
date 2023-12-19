const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getDistricts = async () => {
  const data = await prisma.district.findMany({
    where: {
      is_deleted: false,
    },
    orderBy: {
      id: 'asc',
    },
  });
  return data;
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
  const data = await prisma.district.create({
    data: {
      name: body.name,
    },
  });
  return data;
};

const updateDistrict = async (id, body) => {
  const data = await prisma.district.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      name: body.name,
    },
  });
  return data;
};
const getWards = async (district_user_Id) => {
  const u_d = await prisma.user_district.findFirst({
    where: {
      user_id: district_user_Id
    }
  })
  const data = await prisma.ward.findMany({
    where: { district_id: u_d.district_id },
    select: {
      id: true,
      name: true,
    },
  });
  return data;
};

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
