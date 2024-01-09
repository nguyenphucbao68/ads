const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// update
const update = async (id, body) => {
  const data = await prisma.information_change_request.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      status: body.status,
    },
  });
  if (body.status == 2) {
    if (data.type == 1) {
      data.new_information = JSON.parse(data.new_information);
      await prisma.ads_spot.update({
        where: {
          id: data.new_information.id,
        },
        data: { ...data.new_information, updated_at: new Date() },
      });
    } else if (data.type == 0) {
      data.new_information = JSON.parse(data.new_information);
      data.new_information.expire_date = new Date(data.new_information.expire_date);
      await prisma.ads_panel.update({
        where: {
          id: data.new_information.id,
        },
        data: { ...data.new_information, updated_at: new Date() },
      });
    }
  }

  return data;
};

const create = async (body, userId) => {
  const data = await prisma.information_change_request.create({
    data: {
      type: body.type,
      old_information: body.old_information,
      new_information: body.new_information,
      status: body.status,
      user_id: parseInt(userId),
      reason: body.reason,
      edited_at: body.edited_at,
    },
  });

  return data;
};
const get = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });
  var orderBy = {};
  var whereId = {};
  if (user.role == 0) {
    orderBy = {
      created_at: 'desc',
    };
  } else {
    orderBy = {
      updated_at: 'desc',
    };
    whereId.user_id = userId;
  }

  const data = await prisma.information_change_request.findMany({
    where: whereId,
    orderBy: [orderBy],
  });
  return data;
};

module.exports = {
  create,
  update,
  get,
};
