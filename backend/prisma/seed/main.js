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
    id: 1,
    name: 'Cổ động chính trị',
  },
  {
    id: 2,
    name: 'Quảng cáo thương mại',
  },
  {
    id: 3,
    name: 'Xã hội hoá',
  },
];

const districts = [
  {
    id: 1,
    name: 'Quận 1',
    is_deleted: false,
  },
  {
    id: 2,
    name: 'Quận 2',
    is_deleted: false,
  },
  {
    id: 3,
    name: 'Quận 3',
    is_deleted: false,
  },
  {
    id: 4,
    name: 'Quận 4',
    is_deleted: false,
  },
  {
    id: 5,
    name: 'Quận 5',
    is_deleted: false,
  },
];

const wards = [
  {
    id: 1,
    name: 'Phường Bến Nghé',
    district_id: 1,
    is_deleted: false,
  },
  {
    id: 2,
    name: 'Phường Bến Thành',
    district_id: 1,
    is_deleted: false,
  },
  {
    id: 3,
    name: 'Phường Cầu Kho',
    district_id: 1,
    is_deleted: false,
  },
  {
    id: 4,
    name: 'Phường Cầu Ông Lãnh',
    district_id: 1,
    is_deleted: false,
  },
  {
    id: 5,
    name: 'Phường Đa Kao',
    district_id: 1,
    is_deleted: false,
  },
  {
    id: 6,
    name: 'Phường Nguyễn Cư Trinh',
    district_id: 1,
    is_deleted: false,
  },

  {
    id: 7,
    name: 'Phường An Khánh',
    district_id: 2,
    is_deleted: false,
  },
  {
    id: 8,
    name: 'Phường An Lợi Đông',
    district_id: 2,
    is_deleted: false,
  },
  {
    id: 9,
    name: 'Phường An Phú',
    district_id: 2,
    is_deleted: false,
  },
  {
    id: 10,
    name: 'Phường Bình An',
    district_id: 2,
    is_deleted: false,
  },
  {
    id: 11,
    name: 'Phường Bình Khánh',
    district_id: 2,
    is_deleted: false,
  },

  {
    id: 12,
    name: 'Phường 1',
    district_id: 3,
    is_deleted: false,
  },
  {
    id: 13,
    name: 'Phường 2',
    district_id: 3,
    is_deleted: false,
  },
  {
    id: 14,
    name: 'Phường 3',
    district_id: 3,
    is_deleted: false,
  },
  {
    id: 15,
    name: 'Phường 4',
    district_id: 3,
    is_deleted: false,
  },
  {
    id: 16,
    name: 'Phường 5',
    district_id: 3,
    is_deleted: false,
  },

  {
    id: 17,
    name: 'Phường 1',
    district_id: 4,
    is_deleted: false,
  },
  {
    id: 18,
    name: 'Phường 2',
    district_id: 4,
    is_deleted: false,
  },
  {
    id: 19,
    name: 'Phường 3',
    district_id: 4,
    is_deleted: false,
  },
  {
    id: 20,
    name: 'Phường 4',
    district_id: 4,
    is_deleted: false,
  },
  {
    id: 21,
    name: 'Phường 5',
    district_id: 4,
    is_deleted: false,
  },

  {
    id: 22,
    name: 'Phường 1',
    district_id: 5,
    is_deleted: false,
  },
  {
    id: 23,
    name: 'Phường 2',
    district_id: 5,
    is_deleted: false,
  },
  {
    id: 24,
    name: 'Phường 3',
    district_id: 5,
    is_deleted: false,
  },
  {
    id: 25,
    name: 'Phường 4',
    district_id: 5,
    is_deleted: false,
  },
  {
    id: 26,
    name: 'Phường 5',
    district_id: 5,
    is_deleted: false,
  },
];

const ads_panel_type = [
  {
    id: 1,
    name: 'Trụ bảng hiflex',
  },
  {
    id: 2,
    name: 'Trụ màn hình điện tử LED',
  },
  {
    id: 3,
    name: 'Trụ hộp đèn',
  },
  {
    id: 4,
    name: 'Bảng hiflex ốp tường',
  },
  {
    id: 5,
    name: 'Màn hình điện tử ốp tường',
  },
  {
    id: 6,
    name: 'Trụ treo băng rôn dọc',
  },
  {
    id: 7,
    name: 'Trụ treo băng rôn ngang',
  },
  {
    id: 8,
    name: 'Trụ/Cụm pano',
  },
  {
    id: 9,
    name: 'Cổng chào',
  },
  {
    id: 9,
    name: 'Trung tâm thương mại',
  },
];

const spot_type = [
  {
    id: 1,
    name: 'Đất công/Công viên/Hành lang an toàn giao thông',
  },
  {
    id: 2,
    name: 'Đất tư nhân/Nhà ở riêng lẻ',
  },
  {
    id: 3,
    name: 'Trung tâm thương mại',
  },
  {
    id: 4,
    name: 'Chợ',
  },
  {
    id: 5,
    name: 'Cây xăng',
  },
  {
    id: 6,
    name: 'Nhà chờ xe buýt',
  },
];

// TODO ads_spot add more data.
const ads_spot = [
  {
    id: 1,
    address: '70 Phạm Ngọc Thạch',
    ward_id: 1,
    district_id: 1,
    spot_type_id: spot_type[getRandomElementIndex(spot_type.length)].id,
    ads_type_id: ads_type[getRandomElementIndex(ads_type.length)].id,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.781658,
    longtitude: 106.696942,
    is_available: true,
    max_ads_panel: Math.random(0, 5),
    is_deleted: false,
  },
  {
    id: 2,
    address: '180A Công Lý',
    ward_id: 2,
    district_id: 1,
    spot_type_id: spot_type[getRandomElementIndex(spot_type.length)].id,
    ads_type_id: ads_type[getRandomElementIndex(ads_type.length)].id,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.780447,
    longtitude: 106.693962,
    is_available: true,
    max_ads_panel: Math.random(0, 5),
    is_deleted: false,
  },
  {
    id: 3,
    address: '391 Trần Hưng Đạo',
    ward_id: 2,
    district_id: 1,
    spot_type_id: spot_type[getRandomElementIndex(spot_type.length)].id,
    ads_type_id: ads_type[getRandomElementIndex(ads_type.length)].id,
    image: 'https://lh5.googleusercontent.com/p/AF1QipMP_pfoIx8ox6iNhr3I-cw3JXWSoxmE4mdwQ2v2=w426-h240-k-no',
    latitude: 10.7584,
    longtitude: 106.690047,
    is_available: true,
    max_ads_panel: Math.random(0, 5),
    is_deleted: false,
  },
];

const ads_panel = [
  {
    id: 1,
    ads_type_id: ads_panel_type[getRandomElementIndex(ads_panel_type.length)].id, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: ads_spot[getRandomElementIndex(ads_spot.length)].id, //TODO random ads_spot_id
  },
  {
    id: 2,
    ads_type_id: ads_panel_type[getRandomElementIndex(ads_panel_type.length)].id, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: ads_spot[getRandomElementIndex(ads_spot.length)].id, //TODO random ads_spot_id
  },
  {
    id: 3,
    ads_type_id: ads_panel_type[getRandomElementIndex(ads_panel_type.length)].id, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: ads_spot[getRandomElementIndex(ads_spot.length)].id, //TODO random ads_spot_id
  },
  {
    id: 4,
    ads_type_id: ads_panel_type[getRandomElementIndex(ads_panel_type.length)].id, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: ads_spot[getRandomElementIndex(ads_spot.length)].id, //TODO random ads_spot_id
  },
  {
    id: 5,
    ads_type_id: ads_panel_type[getRandomElementIndex(ads_panel_type.length)].id, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: ads_spot[getRandomElementIndex(ads_spot.length)].id, //TODO random ads_spot_id
  },
  {
    id: 6,
    ads_type_id: ads_panel_type[getRandomElementIndex(ads_panel_type.length)].id, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: ads_spot[getRandomElementIndex(ads_spot.length)].id, //TODO random ads_spot_id
  },
  {
    id: 7,
    ads_type_id: ads_panel_type[getRandomElementIndex(ads_panel_type.length)].id, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: ads_spot[getRandomElementIndex(ads_spot.length)].id, //TODO random ads_spot_id
  },
  {
    id: 9,
    ads_type_id: ads_panel_type[getRandomElementIndex(ads_panel_type.length)].id, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: ads_spot[getRandomElementIndex(ads_spot.length)].id, //TODO random ads_spot_id
  },
  {
    id: 10,
    ads_type_id: ads_panel_type[getRandomElementIndex(ads_panel_type.length)].id, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: ads_spot[getRandomElementIndex(ads_spot.length)].id, //TODO random ads_spot_id
  },
];

const information_change_request = [];

const report_type = [
  {
    id: 1,
    name: 'Tố giác sai phạm',
  },
  {
    id: 2,
    name: 'Đăng ký nội dung',
  },
  {
    id: 3,
    name: 'Đóng góp ý kiến',
  },
  {
    id: 4,
    name: 'Giải đáp thắc mắc',
  },
];

const report = [
  {
    report_type_id: report_type[getRandomElementIndex(report_type.length)].id,
    name: faker.finance.accountName(), // TODO đổi lại sau
    email: 'user@gmail.com',
    phone: faker.phone.number(), // TODO đổi lại sau
    content: 'Chỗ này không được đặt quảng cáo',
    image: faker.image.city(), // TODO đổi lại sau
    status: Math.random(0, 2), // 0: Đang xử lý, 1: Đã xử lý xong
    created_at: CURRENT_DATE,
    ads_panel_id: ads_panel[getRandomElementIndex(ads_panel.length)].id,
  },
];

// TODO user_district
const user_district = [];

// TODO user_ward
const user_ward = [];

const users = [
  {
    id: 1,
    email: 'admin@gmail.com',
    role: 0, // VH-TT
    name: 'admin',
    dob: '10/10/2002',
    username: 'admin',
    password: Buffer.from('admin'),
    otp: '94f03302-849c-4e51-a7af-56da38c39595',
    expire_date: '2022-08-27T14:43:55.772Z',
    is_deleted: false,
  },
  {
    id: 2,
    email: 'district@gmail.com',
    role: 1, // District
    name: 'district',
    dob: '10/10/2002',
    username: 'district',
    password: Buffer.from('district'),
    otp: '7390f2c2-fa57-45a2-b1a9-ed848d28ada2',
    expire_date: '2022-08-27T14:43:55.772Z',
    is_deleted: false,
  },
  {
    id: 4,
    email: 'ward@gmail.com',
    role: 2, // ward
    name: 'ward',
    dob: '10/10/2002',
    username: 'ward',
    password: Buffer.from('ward'),
    otp: '678d4a8e-0a5e-46ee-a75f-e929ad6d27a3',
    expire_date: '2022-08-27T14:43:55.772Z',
    is_deleted: false,
  },
  {
    id: 4,
    email: 'anonymous@gmail.com',
    role: 3, // anonymous
    name: 'anonymous',
    dob: '10/10/2002',
    username: 'anonymous',
    password: Buffer.from('anonymous'),
    otp: 'af34baf6-63a7-4851-bccf-7fceb62352f6',
    expire_date: '2022-08-27T14:43:55.772Z',
    is_deleted: false,
  },
];

const ads_license = [
  {
    ads_panel_id: ads_panel[getRandomElementIndex(ads_panel.length)].id,
    content: 'Cấp phép cho công ty này',
    user_id: users[getRandomElementIndex(users.length)].id,
    start_date: CURRENT_DATE,
    expire_date: getDateNextMoth(),
    status: Math.floor(Math.random() * 3) + 1,
    is_deleted: false,
  },
];

// const createReview = () => {
//   return {
//     id: faker.datatype.uuid(),
//     comment: faker.lorem.lines(1),
//     user_id: USERS[Math.floor(Math.random() * USERS.length)].id,
//     bo_id: BUS_OPERATORS[Math.floor(Math.random() * BUS_OPERATORS.length)].id,
//     rate: faker.datatype.number({ min: 1, max: 5 }),
//   };
// };

// TODO: Function to clear all the data from table by prisma

async function main() {
  // Array.from({ length: 15 }).forEach(() => {
  //   BUS_OPERATORS.push(createBusOperator());
  // });

  // Array.from({ length: 10 }).forEach(() => {
  //   BUS_STATIONS.push(createBusStation());
  // });

  // Array.from({ length: 50000 }).forEach(() => {
  //   BUSES.push(createBuses());
  // });

  // Array.from({ length: 400 }).forEach(() => {
  //   BUS_TICKETS.push(createBusTickets());
  // });

  // Array.from({ length: 1000 }).forEach(() => {
  //   REVIEWS.push(createReview());
  // });
  const database = {
    // TODO add here
    ads_license,
    ads_panel,
    ads_panel_type,
    ads_spot,
    ads_type,
    districts,
    information_change_request,
    report,
    report_type,
    spot_type,
    users,
    user_district,
    user_ward,
    wards,
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(database)) {
    // eslint-disable-next-line no-await-in-loop
    await prisma[key].createMany({
      data: value,
      skipDuplicates: true,
    });
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
