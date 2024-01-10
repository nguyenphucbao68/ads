/* eslint-disable camelcase */
const { PrismaClient, sql } = require('@prisma/client');

const prisma = new PrismaClient();

const getReportsStatistics = async (body) => {
  const { type, district_id, ward_id } = body;

  const adsPanelCondition =
    type === 'district'
      ? district_id !== 0
        ? sql`AND ads_spot.district_id = ${district_id}`
        : sql``
      : ward_id !== 0
      ? sql`AND ads_spot.ward_id = ${ward_id}`
      : sql``;

  const adsSpotCondition =
    type === 'district'
      ? district_id !== 0
        ? sql`AND district_id = ${district_id}`
        : sql``
      : ward_id !== 0
      ? sql`AND ward_id = ${ward_id}`
      : sql``;

  const pendingAdsPanelSqlQuey = sql`
  SELECT
    COUNT(*) AS count
  FROM
    report JOIN ads_panel ON report.ads_panel_id = ads_panel.id JOIN ads_spot ON ads_panel.ads_spot_id = ads_spot.id
  WHERE
    1 = 1
    ${adsPanelCondition}
    AND status = 0
    AND report.ads_panel_id IS NOT NULL
  `;

  const pendingAdsSpotSqlQuey = sql`
  SELECT
    COUNT(*) AS count
  FROM
    report
  WHERE
    1 = 1
    ${adsSpotCondition}
    AND status = 0
    AND report.ads_panel_id IS NULL
  `;

  const pendingAdsPanelReports = await prisma.$queryRaw(pendingAdsPanelSqlQuey);
  const pendingAdsSpotReports = await prisma.$queryRaw(pendingAdsSpotSqlQuey);
  const pendingReportsCount = pendingAdsPanelReports[0].count + pendingAdsSpotReports[0].count;

  const approvedAdsPanelSqlQuey = sql`
    SELECT
        COUNT(*) AS count
    FROM
        report JOIN ads_panel ON report.ads_panel_id = ads_panel.id JOIN ads_spot ON ads_panel.ads_spot_id = ads_spot.id
    WHERE
        1 = 1
        ${adsPanelCondition}
        AND status = 1
        AND report.ads_panel_id IS NOT NULL
    `;

  const approvedAdsSpotSqlQuey = sql`
    SELECT
        COUNT(*) AS count
    FROM
        report
    WHERE
        1 = 1
        ${adsSpotCondition}
        AND status = 1
        AND report.ads_panel_id IS NULL
    `;

  const approvedAdsPanelReports = await prisma.$queryRaw(approvedAdsPanelSqlQuey);
  const approvedAdsSpotReports = await prisma.$queryRaw(approvedAdsSpotSqlQuey);
  const approvedReportsCount = approvedAdsPanelReports[0].count + approvedAdsSpotReports[0].count;

  const rejectedAdsPanelSqlQuey = sql`
    SELECT
        COUNT(*) AS count
    FROM
        report JOIN ads_panel ON report.ads_panel_id = ads_panel.id JOIN ads_spot ON ads_panel.ads_spot_id = ads_spot.id
    WHERE
        1 = 1
        ${adsPanelCondition}
        AND status = 2
        AND report.ads_panel_id IS NOT NULL
    `;

  const rejectedAdsSpotSqlQuey = sql`
    SELECT
        COUNT(*) AS count
    FROM
        report
    WHERE
        1 = 1
        ${adsSpotCondition}
        AND status = 2
        AND report.ads_panel_id IS NULL
    `;

  const rejectedAdsPanelReports = await prisma.$queryRaw(rejectedAdsPanelSqlQuey);
  const rejectedAdsSpotReports = await prisma.$queryRaw(rejectedAdsSpotSqlQuey);
  const rejectedReportsCount = rejectedAdsPanelReports[0].count + rejectedAdsSpotReports[0].count;

  return {
    labels: ['Chưa xử lý', 'Đang xử lý', 'Đã xử lý'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
        data: [pendingReportsCount, approvedReportsCount, rejectedReportsCount],
      },
    ],
  };
};

module.exports = {
  getReportsStatistics,
};
