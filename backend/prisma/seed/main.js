/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const MAX = 20;
const MIN = 15;
const CURRENT_DATE = new Date();

/**
 * Function return the date of 1 month ahead from now
 * @returns
 */
const getDateNextMoth = () => {
  const nextMoth = new Date(CURRENT_DATE);
  nextMoth.setMonth(nextMoth.getMonth() + 1);
  return nextMoth;
};

/**
 * Functions returns random element index in a list with length
 * @param {*} length : size of list
 * @returns
 */
const getRandomElementIndex = (length) => {
  return Math.floor(Math.random() * length);
};

const ads_type = [
  {
    // id: 1,
    name: 'Cổ động chính trị',
    is_deleted: false,
  },
  {
    // id: 2,
    name: 'Quảng cáo thương mại',
    is_deleted: false,
  },
  {
    // id: 3,
    name: 'Xã hội hoá',
    is_deleted: false,
  },
];

const district = [
  {
    // id: 1,
    name: 'Quận 1',
    is_deleted: false,
  },
  {
    // id: 2,
    name: 'Quận 2',
    is_deleted: false,
  },
  {
    // id: 3,
    name: 'Quận 3',
    is_deleted: false,
  },
  {
    // id: 4,
    name: 'Quận 4',
    is_deleted: false,
  },
  {
    // id: 5,
    name: 'Quận 5',
    is_deleted: false,
  },
];

const ward = [
  {
    // id: 1,
    name: 'Phường Bến Nghé',
    district_id: 1,
    is_deleted: false,
  },
  {
    // id: 2,
    name: 'Phường Bến Thành',
    district_id: 1,
    is_deleted: false,
  },
  {
    // id: 3,
    name: 'Phường Cầu Kho',
    district_id: 1,
    is_deleted: false,
  },
  {
    // id: 4,
    name: 'Phường Cầu Ông Lãnh',
    district_id: 1,
    is_deleted: false,
  },
  {
    // id: 5,
    name: 'Phường Đa Kao',
    district_id: 1,
    is_deleted: false,
  },
  {
    // id: 6,
    name: 'Phường Nguyễn Cư Trinh',
    district_id: 1,
    is_deleted: false,
  },

  {
    // id: 7,
    name: 'Phường An Khánh',
    district_id: 2,
    is_deleted: false,
  },
  {
    // id: 8,
    name: 'Phường An Lợi Đông',
    district_id: 2,
    is_deleted: false,
  },
  {
    // id: 9,
    name: 'Phường An Phú',
    district_id: 2,
    is_deleted: false,
  },
  {
    // id: 10,
    name: 'Phường Bình An',
    district_id: 2,
    is_deleted: false,
  },
  {
    // id: 11,
    name: 'Phường Bình Khánh',
    district_id: 2,
    is_deleted: false,
  },

  {
    // id: 12,
    name: 'Phường 1',
    district_id: 3,
    is_deleted: false,
  },
  {
    // id: 13,
    name: 'Phường 2',
    district_id: 3,
    is_deleted: false,
  },
  {
    // id: 14,
    name: 'Phường 3',
    district_id: 3,
    is_deleted: false,
  },
  {
    // id: 15,
    name: 'Phường 4',
    district_id: 3,
    is_deleted: false,
  },
  {
    // id: 16,
    name: 'Phường 5',
    district_id: 3,
    is_deleted: false,
  },

  {
    // id: 17,
    name: 'Phường 1',
    district_id: 4,
    is_deleted: false,
  },
  {
    // id: 18,
    name: 'Phường 2',
    district_id: 4,
    is_deleted: false,
  },
  {
    // id: 19,
    name: 'Phường 3',
    district_id: 4,
    is_deleted: false,
  },
  {
    // id: 20,
    name: 'Phường 4',
    district_id: 4,
    is_deleted: false,
  },
  {
    // id: 21,
    name: 'Phường 5',
    district_id: 4,
    is_deleted: false,
  },

  {
    // id: 22,
    name: 'Phường 1',
    district_id: 5,
    is_deleted: false,
  },
  {
    // id: 23,
    name: 'Phường 2',
    district_id: 5,
    is_deleted: false,
  },
  {
    // id: 24,
    name: 'Phường 3',
    district_id: 5,
    is_deleted: false,
  },
  {
    // id: 25,
    name: 'Phường 4',
    district_id: 5,
    is_deleted: false,
  },
  {
    // id: 26,
    name: 'Phường 5',
    district_id: 5,
    is_deleted: false,
  },
];

const ads_panel_type = [
  {
    // id: 1,
    name: 'Trụ bảng hiflex',
    is_deleted: false,
  },
  {
    // id: 2,
    name: 'Trụ màn hình điện tử LED',
    is_deleted: false,
  },
  {
    // id: 3,
    name: 'Trụ hộp đèn',
    is_deleted: false,
  },
  {
    // id: 4,
    name: 'Bảng hiflex ốp tường',
    is_deleted: false,
  },
  {
    // id: 5,
    name: 'Màn hình điện tử ốp tường',
    is_deleted: false,
  },
  {
    // id: 6,
    name: 'Trụ treo băng rôn dọc',
    is_deleted: false,
  },
  {
    // id: 7,
    name: 'Trụ treo băng rôn ngang',
    is_deleted: false,
  },
  {
    // id: 8,
    name: 'Trụ/Cụm pano',
    is_deleted: false,
  },
  {
    // id: 9,
    name: 'Cổng chào',
    is_deleted: false,
  },
  {
    // id: 9,
    name: 'Trung tâm thương mại',
    is_deleted: false,
  },
];

const spot_type = [
  {
    // id: 1,
    name: 'Đất công/Công viên/Hành lang an toàn giao thông',
    is_deleted: false,
  },
  {
    // id: 2,
    name: 'Đất tư nhân/Nhà ở riêng lẻ',
    is_deleted: false,
  },
  {
    // id: 3,
    name: 'Trung tâm thương mại',
    is_deleted: false,
  },
  {
    // id: 4,
    name: 'Chợ',
    is_deleted: false,
  },
  {
    // id: 5,
    name: 'Cây xăng',
    is_deleted: false,
  },
  {
    // id: 6,
    name: 'Nhà chờ xe buýt',
    is_deleted: false,
  },
];

const ads_spot = [
  {
    // id: 1,
    address: '13 Lý Trự Trọng',
    ward_id: 1,
    district_id: 1,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.781837,
    longtitude: 106.704526,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 2,
    address: '180A Công Lý',
    ward_id: 2,
    district_id: 1,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.780447,
    longtitude: 106.693962,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 3,
    address: '391 Trần Hưng Đạo',
    ward_id: 3,
    district_id: 1,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.7584,
    longtitude: 106.690047,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 4,
    address: '39 Nguyễn Thái Học',
    ward_id: 4,
    district_id: 1,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.764903,
    longtitude: 106.697059,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 5,
    address: '79 Đa Kao',
    ward_id: 5,
    district_id: 1,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.789866,
    longtitude: 106.697008,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 6,
    address: '1/2D Lý Thái Tổ',
    ward_id: 6,
    district_id: 1,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.765375,
    longtitude: 106.681356,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },

  {
    // id: 7,
    address: '23/7A, Xóm Thủ Thiêm',
    ward_id: 7,
    district_id: 2,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.779663,
    longtitude: 106.720376,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },

  {
    // id: 8,
    address: '571 An Đông Lợi',
    ward_id: 8,
    district_id: 2,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.765041,
    longtitude: 106.726575,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },

  {
    // id: 9,
    address: 'Đồng Văn Cống',
    ward_id: 9,
    district_id: 2,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.786399,
    longtitude: 106.750492,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 10,
    address: '95 Trần Nao',
    ward_id: 10,
    district_id: 2,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.794046,
    longtitude: 106.730959,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 11,
    address: '19 Mai Chi Thọ',
    ward_id: 11,
    district_id: 2,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.782241,
    longtitude: 106.739363,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },

  {
    // id: 12,
    address: '61/120 Cao Thắng',
    ward_id: 12,
    district_id: 3,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.768275,
    longtitude: 106.67998,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 13,
    address: '462 Đường Nguyễn Thị Minh Khai',
    ward_id: 13,
    district_id: 3,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.767851,
    longtitude: 106.683864,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },

  {
    // id: 14,
    address: '103 Cao Thắng',
    ward_id: 14,
    district_id: 3,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.772667,
    longtitude: 106.67906,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },

  {
    // id: 15,
    address: '306/5 Nguyễn Thị Minh Khai',
    ward_id: 16,
    district_id: 3,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.772848,
    longtitude: 106.68842,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 16,
    address: '1 Tôn Thất Thuyết',
    ward_id: 17,
    district_id: 4,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.754464,
    longtitude: 106.692152,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 17,
    address: '306/5 Nguyễn Thị Minh Khai',
    ward_id: 18,
    district_id: 4,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.772848,
    longtitude: 106.68842,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 18,
    address: 'Số 2a Vĩnh Hội',
    ward_id: 19,
    district_id: 4,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.755651,
    longtitude: 106.700831,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 19,
    address: '47-49 Vĩnh Hội',
    ward_id: 20,
    district_id: 4,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.756108,
    longtitude: 106.703511,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },

  {
    // id: 20,
    address: '254/4 Bến Vân Đồn',
    ward_id: 21,
    district_id: 4,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.759064,
    longtitude: 106.695702,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 21,
    address: '905 Trần Hưng Đạo',
    ward_id: 22,
    district_id: 5,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.753509,
    longtitude: 106.682388,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 22,
    address: '10 Nguyễn Tri Phương',
    ward_id: 23,
    district_id: 3,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.763258,
    longtitude: 106.669272,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 23,
    address: '118/1, Nguyễn Trãi',
    ward_id: 24,
    district_id: 5,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.755715,
    longtitude: 106.673618,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 24,
    address: '157/1, Nguyễn Chí Thanh',
    ward_id: 25,
    district_id: 5,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.758942,
    longtitude: 106.665194,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
  {
    // id: 25,
    address: '1031 Trần Hưng Đạo',
    ward_id: 26,
    district_id: 5,
    spot_type_id: Math.floor(Math.random() * 6) + 1,
    ads_type_id: Math.floor(Math.random() * 3) + 1,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.753638,
    longtitude: 106.675211,
    is_available: true,
    max_ads_panel: Math.floor(Math.random() * 5) + 1,
  },
];

// TODO find image data to seed
const ads_panel = [
  {
    // id: 1,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * 25) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 2,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * 25) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 3,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * 25) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 4,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * 25) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 5,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * 25) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 6,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * 25) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 7,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * 25) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 9,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * 25) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 10,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * 25) + 1,
    image: '',
    is_deleted: false,
  },
];

// TODO
const information_change_request = [];//status 0: pending, 1: not approved, 2: approved

const report_type = [
  {
    // id: 1,
    name: 'Tố giác sai phạm',
    is_deleted: false,
  },
  {
    // id: 2,
    name: 'Đăng ký nội dung',
    is_deleted: false,
  },
  {
    // id: 3,
    name: 'Đóng góp ý kiến',
    is_deleted: false,
  },
  {
    // id: 4,
    name: 'Giải đáp thắc mắc',
    is_deleted: false,
  },
];

const report = [
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    report_type_id: Math.floor(Math.random() * 4) + 1,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.round(Math.random()), //0: chưa xử lý, 1: đang xử lý, 2: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    ward_id: Math.floor(Math.random() * 9) + 1,
    district_id: Math.floor(Math.random() * 4) + 1,
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
];

const user = [
  {
    // id: 1,
    email: 'admin@gmail.com',
    role: 0, // VH-TT
    name: 'admin',
    dob: '10/10/2002',
    username: 'admin',
    password: Buffer.from('$2a$10$uR5S.P86tXoBfCHl0a03bePKyN/1yE/1oCW5oRNs/IYfbDeL.WY9O'),
    otp: '94f03302-849c-4e51-a7af-56da38c39595',
    expire_date: '2022-08-27T14:43:55.772Z',
    is_deleted: false,
  },
  {
    // id: 2,
    email: 'district@gmail.com',
    role: 1, // District
    name: 'district',
    dob: '10/10/2002',
    username: 'district',
    password: Buffer.from('$2a$10$uR5S.P86tXoBfCHl0a03bePKyN/1yE/1oCW5oRNs/IYfbDeL.WY9O'),
    otp: '7390f2c2-fa57-45a2-b1a9-ed848d28ada2',
    expire_date: '2022-08-27T14:43:55.772Z',
    is_deleted: false,
  },
  {
    // id: 3,
    email: 'ward@gmail.com',
    role: 2, // ward
    name: 'ward',
    dob: '10/10/2002',
    username: 'ward',
    password: Buffer.from('$2a$10$uR5S.P86tXoBfCHl0a03bePKyN/1yE/1oCW5oRNs/IYfbDeL.WY9O'),
    otp: '678d4a8e-0a5e-46ee-a75f-e929ad6d27a3',
    expire_date: '2022-08-27T14:43:55.772Z',
    is_deleted: false,
  },
];

const ads_license = [
  {
    ads_panel_id: Math.floor(Math.random() * 10) + 1,
    content: 'Cấp phép cho công ty này',
    user_id: Math.floor(Math.random() * 3) + 1,
    start_date: CURRENT_DATE,
    expire_date: getDateNextMoth(),
    status: 0,
    is_deleted: false,
    name: 'CÔNG TY CỔ PHẦN ĐẦU TƯ SẢN XUẤT LÊ TRẦN',
    email: 'letran@gmail.com',
    phone: '02838382342',
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    ads_panel_id: Math.floor(Math.random() * 10) + 1,
    content: 'Cấp phép cho công ty này',
    user_id: Math.floor(Math.random() * 3) + 1,
    start_date: CURRENT_DATE,
    expire_date: getDateNextMoth(),
    status: 1,
    is_deleted: false,
    name: 'CÔNG TY TNHH MỘT THÀNH VIÊN SẢN XUẤT VÀ THƯƠNG MẠI LIỄU TÚ',
    email: 'lieutu@gmail.com',
    phone: '02838954814',
    address: '92 NGUYỄN BIỂU, PHƯỜNG 1, QUẬN 5, TP. HCM',
  },
  {
    ads_panel_id: Math.floor(Math.random() * 10) + 1,
    content: 'Cấp phép cho công ty này',
    user_id: Math.floor(Math.random() * 3) + 1,
    start_date: CURRENT_DATE,
    expire_date: getDateNextMoth(),
    status: 2,
    is_deleted: false,
    name: 'CÔNG TY TNHH C.H MERAKI',
    email: 'meraki@gmail.com',
    phone: '02838954814',
    address: '42/43 Lê Lợi, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh',
  },
];

// TODO user_district
const user_district = [
  {
    user_id: 2,
    district_id: 1,
  },
];

// TODO user_ward
const user_ward = [
  {
    user_id: 3,
    ward_id: 1,
  },
];

async function main() {
  // Array.from({ length: 15 }).forEach(() => {
  //   BUS_OPERATORS.push(createBusOperator());
  // });

  const database = {
    ads_type,
    district,
    ward,
    ads_panel_type,
    spot_type,
    ads_spot,
    ads_panel,
    information_change_request,
    report_type,
    report,
    user,
    ads_license,
    user_district,
    user_ward,
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(database)) {
    // eslint-disable-next-line no-await-in-loop
    await prisma[key].deleteMany();
    console.log(`Deleted ${key}!`);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(database)) {
    // eslint-disable-next-line guard-for-in
    for (const item of value) {
      // eslint-disable-next-line no-await-in-loop
      await prisma[key].create({
        data: item,
        // skipDuplicates: true,
      });
    }

    console.log(`Seeded ${key}!`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
