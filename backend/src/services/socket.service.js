const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const findRoleById = async (id) => {
  const data = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      role: true,
    },
  });
  return data.role;
};
module.exports = {
  findRoleById,
};
