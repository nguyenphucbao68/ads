/* eslint-disable no-await-in-loop */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const prisma = new PrismaClient();

// const { transformDocument } = require('@prisma/client/runtime');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const create = async (userBody) => {
  const checkEmail = await prisma.user.findFirst({
    where: {
      email: userBody.email,
    },
  });

  if (checkEmail) {
    throw new Error('Email already exists');
  }

  const saltRounds = 10;

  // eslint-disable-next-line no-param-reassign
  userBody.password = await bcrypt.hash(userBody.password, saltRounds);
  // eslint-disable-next-line no-param-reassign
  userBody.password = Buffer.from(userBody.password);

  // eslint-disable-next-line no-param-reassign
  const user = await prisma.user.create({
    data: {
      role: userBody.role,
      dob: userBody.dob,
      email: userBody.email,
      phone: userBody.phone,
      username: userBody.username,
      password: userBody.password,
    },
  });

  if (userBody.role === 1) {
    await prisma.user_district.create({
      data: {
        user_id: user.id,
        district_id: userBody.district_id,
      },
    });
  } else if (userBody.role === 2) {
    await prisma.user_ward.create({
      data: {
        user_id: user.id,
        ward_id: userBody.ward_id,
      },
    });
  }

  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user.role === 1) {
    const userDistrict = await prisma.user_district.findFirst({
      where: {
        user_id: user.id,
      },
    });
    const district = await prisma.district.findFirst({
      where: {
        id: userDistrict.district_id,
      },
    });
    user.district = district;
  } else if (user.role === 2) {
    const userWard = await prisma.user_ward.findFirst({
      where: {
        user_id: user.id,
      },
    });
    const ward = await prisma.ward.findFirst({
      where: {
        id: userWard.ward_id,
      },
    });
    user.ward = ward;
  }

  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const update = async (userId, data) => {
  const user = await prisma.user.update({
    where: {
      id: parseInt(userId, 10),
    },
    data: {
      role: data.role,
      dob: data.dob,
      email: data.email,
      phone: data.phone,
      username: data.username,
      password: data.password,
      updated_at: new Date(),
    },
  });

  if (data.role === 1) {
    const userDistrict = await prisma.user_district.findFirst({
      where: {
        user_id: userId,
      },
    });
    if (userDistrict) {
      await prisma.user_district.update({
        where: {
          user_id: userId,
        },
        data: {
          district_id: data.district_id,
        },
      });
    } else {
      await prisma.user_district.create({
        data: {
          user_id: userId,
          district_id: data.district_id,
        },
      });
    }
  } else if (data.role === 2) {
    const userWard = await prisma.user_ward.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (userWard) {
      await prisma.user_ward.updateMany({
        where: {
          user_id: userId,
        },
        data: {
          ward_id: data.ward_id,
        },
      });
    } else {
      await prisma.user_ward.create({
        data: {
          user_id: userId,
          ward_id: data.ward_id,
        },
      });
    }
  }

  return user;
};

const getAll = async () => {
  const data = await prisma.user.findMany({
    where: {
      is_deleted: false,
      role: {
        in: [0, 1, 2],
      },
    },
    include: {
      user_district: true,
      user_ward: true,
    },
    orderBy: {
      updated_at: 'desc',
    },
  });
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].role === 1) {
      let district = {};
      if (data[i].user_district.length > 0) {
        district = await prisma.district.findFirst({
          where: {
            id: data[i].user_district[0].district_id,
          },
        });
      }
      data[i].location = district.name || 'Chưa phân công';
    } else if (data[i].role === 2) {
      let ward = {};
      if (data[i].user_ward.length > 0) {
        ward = await prisma.ward.findFirst({
          where: {
            id: data[i].user_ward[0].ward_id,
          },
        });
      }
      data[i].location = ward.name || 'Chưa phân công';
    } else data[i].location = 'Tất cả';
    data[i].password = '';
  }

  return data;
};

const deleteUser = async (id) => {
  const data = await prisma.user.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
    },
  });
  return data;
};

module.exports = {
  getAll,
  create,
  queryUsers,
  getById,
  getUserByEmail,
  update,
  deleteUser,
};
