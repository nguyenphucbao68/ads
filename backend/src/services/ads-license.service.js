const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAdsLicenseById = async (id) => {
  const data = await prisma.ads_license.findUnique({
    where: {
      id,
    },
    include: {
      ads_panel: {
        select: {
          image: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    // include: {
    //   bus_operators: {
    //     select: { name: true },
    //   },
    //   bus_stations_bus_stationsTobuses_start_point: {
    //     select: {
    //       name: true,
    //     },
    //   },
    //   bus_stations_bus_stationsTobuses_end_point: {
    //     select: {
    //       name: true,
    //     },
    //   },
    // },
  });
  return data;
};

const getAdsLicenses = async (page, limit, req) => {
  let data = null;
  let condition = {};
  if (req.user.role == 'bus_operator') {
    user = await prisma.users.findFirst({
      where: {
        id: req.user.id,
      },
      select: {
        boid: true,
      },
    });
    condition = { bo_id: user.boid };
  }
  console.log(condition);
  data = await prisma.buses.findMany({
    skip: page * limit,
    take: limit,
    where: condition,

    include: {
      bus_operators: {
        select: {
          name: true, // MORE INFO
          image_url: true,
        },
      },
      bus_stations_bus_stationsTobuses_start_point: {
        select: {
          name: true,
        },
      },
      bus_stations_bus_stationsTobuses_end_point: {
        select: {
          name: true,
        },
      },
    },
    orderBy: [
      {
        start_time: 'desc',
      },
    ],
  });

  return { data };
};

module.exports = {
  getAdsLicenseById,
  getAdsLicenses,
};
