const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getReports = async (wid = 0, did = 0) => {
  let data = [];

  if (did) {
    data = await prisma.$queryRaw`select * from report r 
      join user_district ud on r.handled_user_id = ud.user_id 
      where district_id = ${did}`;
  } else if (wid) {
    data = await prisma.$queryRaw`select * from report r 
      join user_ward uw on r.handled_user_id = uw.user_id 
      where ward_id = ${wid}`;
  } else {
    data = await prisma.$queryRaw`select * from report`;
  }
  const total = data.length;
  const pending = data.filter((item) => item.status === 0).length;
  const finished = data.filter((item) => item.status === 1).length;

  return {
    total,
    pending,
    finished,
    data,
  };
};

const createReport = async (reportBody) => {
  const report = await prisma.report.create({
    data: reportBody,
  });

  return report;
};

module.exports = {
  getReports,
  createReport,
};
