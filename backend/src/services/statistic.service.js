/* eslint-disable camelcase */
const { PrismaClient, sql } = require('@prisma/client');

const prisma = new PrismaClient();

const getReportsStatistics = async (body) => {
  const { type, district_id, ward_id } = body;

  const condition = type === 'district' ? sql`AND district_id = ${district_id}` : sql`AND ward_id = ${ward_id}`;

  const pendingSqlQuey = sql`
  SELECT
    COUNT(*) AS count
  FROM
    report JOIN ads_panel ON report.ads_panel_id = ads_panel.id JOIN ads_spot ON ads_panel.ads_spot_id = ads_spot.id
  WHERE
    1 = 1
    ${condition}
    AND status = 0
  `;

  const pendingReports = await prisma.$queryRaw(pendingSqlQuey);

  const approvedSqlQuey = sql`
    SELECT
        COUNT(*) AS count
    FROM
        report JOIN ads_panel ON report.ads_panel_id = ads_panel.id JOIN ads_spot ON ads_panel.ads_spot_id = ads_spot.id
    WHERE
        1 = 1
        ${condition}
        AND status = 1
    `;
  const approvedReports = await prisma.$queryRaw(approvedSqlQuey);

  const rejectedSqlQuey = sql`
    SELECT
        COUNT(*) AS count
    FROM
        report JOIN ads_panel ON report.ads_panel_id = ads_panel.id JOIN ads_spot ON ads_panel.ads_spot_id = ads_spot.id
    WHERE
        1 = 1
        ${condition}
        AND status = 2
    `;
  const rejectedReports = await prisma.$queryRaw(rejectedSqlQuey);

  return {
    labels: ['Chưa xử lý', 'Đã duyệt', 'Không phê duyệt'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
        data: [pendingReports[0].count, approvedReports[0].count, rejectedReports[0].count],
      },
    ],
  };
};

module.exports = {
  getReportsStatistics,
};
