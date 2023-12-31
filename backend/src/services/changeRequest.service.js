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

const create = async (body, userId) => {
  const data = await prisma.information_change_request.create({
    data: {
      type: parseInt(body.type),
      old_information: body.old_information,
      new_information: body.new_information,
      status: body.status,
      user_id: userId,
    },
  });

  return data;
};

module.exports = {
  create,
  update,
};
