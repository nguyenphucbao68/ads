const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// update
const update = async (id, body) => {
  const data = await prisma.information_change_request.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      name: body.name,
    },
  });

  return data;
};

module.exports = {
  update,
};
