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
    name: 'Quận 1',
    is_deleted: false,
  },
  {
    name: 'Quận 2',
    is_deleted: false,
  },
  {
    name: 'Quận 3',
    is_deleted: false,
  },
  {
    name: 'Quận 4',
    is_deleted: false,
  },
  {
    name: 'Quận 5',
    is_deleted: false,
  },
  {
    name: 'Quận 10',
    is_deleted: false,
  },
];

const ward = [
  {
    name: 'Phường Bến Nghé',
    district_id: 1,
    is_deleted: false,
  },
  {
    name: 'Phường Bến Thành',
    district_id: 1,
    is_deleted: false,
  },
  {
    name: 'Phường Cầu Kho',
    district_id: 1,
    is_deleted: false,
  },
  {
    name: 'Phường Cầu Ông Lãnh',
    district_id: 1,
    is_deleted: false,
  },
  {
    name: 'Phường Đa Kao',
    district_id: 1,
    is_deleted: false,
  },
  {
    name: 'Phường Nguyễn Cư Trinh',
    district_id: 1,
    is_deleted: false,
  },
  {
    name: 'Phường An Khánh',
    district_id: 2,
    is_deleted: false,
  },
  {
    name: 'Phường An Lợi Đông',
    district_id: 2,
    is_deleted: false,
  },
  {
    name: 'Phường An Phú',
    district_id: 2,
    is_deleted: false,
  },
  {
    name: 'Phường Bình An',
    district_id: 2,
    is_deleted: false,
  },
  {
    name: 'Phường Bình Khánh',
    district_id: 2,
    is_deleted: false,
  },
  {
    name: 'Phường 1',
    district_id: 3,
    is_deleted: false,
  },
  {
    name: 'Phường 2',
    district_id: 3,
    is_deleted: false,
  },
  {
    name: 'Phường 3',
    district_id: 3,
    is_deleted: false,
  },
  {
    name: 'Phường 4',
    district_id: 3,
    is_deleted: false,
  },
  {
    name: 'Phường 5',
    district_id: 6,
    is_deleted: false,
  },
  {
    name: 'Phường 6',
    district_id: 6,
    is_deleted: false,
  },
  {
    name: 'Phường 8',
    district_id: 6,
    is_deleted: false,
  },
  {
    name: 'Phường 9',
    district_id: 5,
    is_deleted: false,
  },
  {
    name: 'Phường 12',
    district_id: 5,
    is_deleted: false,
  },
  {
    name: 'Phường 7',
    district_id: 6,
    is_deleted: false,
  },
  {
    name: 'Phường 11',
    district_id: 5,
    is_deleted: false,
  },
  {
    name: 'Phường 10',
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
    address: '200 Đào Duy Từ',
    ward_id: 16,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 2,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705215068/kbzg9d1eptchlsmtvlqd.jpg',
    latitude: 10.760125,
    longtitude: 106.66538,
    is_available: false,
    max_ads_panel: 5,
    is_deleted: false,
  },
  {
    address: '436/15 Hoà Hảo',
    ward_id: 16,
    district_id: 6,
    spot_type_id: 4,
    ads_type_id: 2,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705215068/kbzg9d1eptchlsmtvlqd.jpg',
    latitude: 10.761551,
    longtitude: 106.66704,
    is_available: false,
    max_ads_panel: 5,
    is_deleted: false,
  },
  {
    address: '361 Nguyễn Tri Phương',
    ward_id: 16,
    district_id: 6,
    spot_type_id: 5,
    ads_type_id: 2,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705215068/kbzg9d1eptchlsmtvlqd.jpg',
    latitude: 10.762724,
    longtitude: 106.668236,
    is_available: true,
    max_ads_panel: 5,
    is_deleted: false,
  },
  {
    address: '25 Tân Phước',
    ward_id: 17,
    district_id: 6,
    spot_type_id: 5,
    ads_type_id: 3,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705215068/kbzg9d1eptchlsmtvlqd.jpg',
    latitude: 10.761744,
    longtitude: 106.66335,
    is_available: true,
    max_ads_panel: 2,
    is_deleted: false,
  },
  {
    address: '188 Đào Duy Từ',
    ward_id: 17,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 2,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705215068/kbzg9d1eptchlsmtvlqd.jpg',
    latitude: 10.75953,
    longtitude: 106.66261,
    is_available: false,
    max_ads_panel: 3,
    is_deleted: false,
  },
  {
    address: '88 Ngô Quyền',
    ward_id: 16,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705217896/e8sk4kwjtqhcyfrzheje.jpg',
    latitude: 10.761183,
    longtitude: 106.665146,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '526 Vĩnh Viễn',
    ward_id: 17,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705217936/haabcic6sa7mvgfetqgc.jpg',
    latitude: 10.762915,
    longtitude: 106.664154,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '908/20 Nguyễn Kim',
    ward_id: 21,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705217962/oond59osi6egedl2zqbh.jpg',
    latitude: 10.761481,
    longtitude: 106.66221,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Hẻm 54 Đào Duy Từ',
    ward_id: 16,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705217977/awndwhzpv0wldusgtbmy.jpg',
    latitude: 10.760544,
    longtitude: 106.66713,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Ngã sáu Nguyễn Tri Phương, Nguyễn Tri Phương',
    ward_id: 15,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705217991/sv8akqqibpcejsitlevd.jpg',
    latitude: 10.759935,
    longtitude: 106.668915,
    is_available: true,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '342 Nguyễn Chí Thanh',
    ward_id: 16,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218008/uxqiiplvuxacgithmnu7.jpg',
    latitude: 10.759567,
    longtitude: 106.66663,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '476 Nguyễn Chí Thanh',
    ward_id: 21,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218020/qdco6ttpmamjidtne5ur.jpg',
    latitude: 10.758754,
    longtitude: 106.66276,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Trung Nguyen Cafe',
    ward_id: 21,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218031/dlq8bshp4vpubh6no5ex.jpg',
    latitude: 10.759389,
    longtitude: 106.661316,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Hải Phát - Chuyên bán đồ nhún các loại, 149 Ngô Quyền',
    ward_id: 19,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218046/nsvgjl5frxbhocadlhjm.jpg',
    latitude: 10.758788,
    longtitude: 106.6657,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '502 Ngô Gia Tự',
    ward_id: 19,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218062/vfrflstldpyeifxqfxyw.jpg',
    latitude: 10.758907,
    longtitude: 106.66815,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '317 Nguyễn Tri Phương',
    ward_id: 16,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218076/b1njhhpxrbbuz7kglfoc.jpg',
    latitude: 10.761949,
    longtitude: 106.66839,
    is_available: true,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '175/14 Nguyễn Kim',
    ward_id: 20,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218091/vtqwmx1so3dasnfs6nte.jpg',
    latitude: 10.757381,
    longtitude: 106.663025,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Bệnh viện Phạm Ngọc Thạch cổng 2, Đường Hùng Vương',
    ward_id: 19,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218105/pqacgmqq257jacjocpdk.jpg',
    latitude: 10.756387,
    longtitude: 106.666306,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '215 Đ. Hồng Bàng',
    ward_id: 22,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218116/vsxnr2lphu3ganqeprtx.jpg',
    latitude: 10.755701,
    longtitude: 106.66418,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'ATM Techcombank, 468A Nguyễn Chí Thanh',
    ward_id: 17,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218134/mlb1r3sljdnw6taeigmi.jpg',
    latitude: 10.759034,
    longtitude: 106.66403,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'q10, 454',
    ward_id: 15,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218148/ctllyt0q6r3hksrowhjg.jpg',
    latitude: 10.760883,
    longtitude: 106.66964,
    is_available: true,
    max_ads_panel: 3,
    is_deleted: false,
  },
  {
    address: '83 Ngô Quyền',
    ward_id: 17,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218163/dksiqbxunldxszycrgx3.jpg',
    latitude: 10.762194,
    longtitude: 106.66488,
    is_available: true,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Tiệm bánh mì Đỗ Quỳnh, 352A Ngô Gia Tự',
    ward_id: 15,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218177/nhhdhnev2rfx4ssj9axb.jpg',
    latitude: 10.762418,
    longtitude: 106.67064,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Cổng chính, Ký túc xá Đại học Y Dược Thành phồ Hồ Chí Minh, Ngô Gia Tự',
    ward_id: 19,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218190/gc6jpsxf6xyqmhqqep4t.jpg',
    latitude: 10.757746,
    longtitude: 106.66725,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Vì tôi đẹp Shop, Nguyễn Kim',
    ward_id: 17,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218205/smjbl5mheinf633tzpfz.jpg',
    latitude: 10.760586,
    longtitude: 106.662415,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '308/9 Nguyễn Tri Phương',
    ward_id: 15,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218220/knnv5hkc7mliyirxlrpj.jpg',
    latitude: 10.763843,
    longtitude: 106.668015,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '416 Vĩnh Viễn',
    ward_id: 18,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218232/po54hwr2kt2e5jxjwdpk.jpg',
    latitude: 10.763414,
    longtitude: 106.66624,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '157 Đ. Nguyễn Chí Thanh',
    ward_id: 13,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218248/vvaj1nzbwu1hjcntiosm.jpg',
    latitude: 10.76039,
    longtitude: 106.670975,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Huy Đức - Mua bán dây zắc, 143 Nguyễn Kim',
    ward_id: 21,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218263/ewm4jb7ghyxncdevwnd2.jpg',
    latitude: 10.762436,
    longtitude: 106.66199,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Nhà xe Thảo Châu, 70B B Đ. Hùng Vương',
    ward_id: 19,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218282/d4cdv1aohwbdn9odjhmw.jpg',
    latitude: 10.758938,
    longtitude: 106.67134,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '102 Đ. Hùng Vương',
    ward_id: 19,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218296/hgqcabk2z6ktxjhtei0u.jpg',
    latitude: 10.757681,
    longtitude: 106.66938,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '189 Đ. Nguyễn Tri Phương',
    ward_id: 18,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218309/mtfepd3q4cgysk2fhvbf.jpg',
    latitude: 10.756703,
    longtitude: 106.66957,
    is_available: true,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Nguyễn Tri Phương',
    ward_id: 18,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218325/mxu3iuiybczbsl4qopsy.jpg',
    latitude: 10.754691,
    longtitude: 106.66953,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Viễn Đông Việt',
    ward_id: 22,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218338/cq28vyzwnbr0uh138it6.jpg',
    latitude: 10.754064,
    longtitude: 106.666504,
    is_available: true,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Công Ty Tnhh Bảo Hiểm Nhân Thọ Great Eastern, Tản Đà',
    ward_id: 22,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218374/nw6mc7f7vpm21swsgenk.jpg',
    latitude: 10.753624,
    longtitude: 106.664085,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '68 Tản Đà',
    ward_id: 22,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218390/ueaa3ms59svkbx4ot9nw.jpg',
    latitude: 10.752337,
    longtitude: 106.66436,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Phòng Giao dịch Quận 5 - Ngân hàng Sài Gòn Công Thương, 182-184 Trần Hưng Đạo',
    ward_id: 21,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218404/eveeedbwjdman98c23or.jpg',
    latitude: 10.752557,
    longtitude: 106.66672,
    is_available: true,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '338 Trần Phú',
    ward_id: 21,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218420/uyph4d4c4u8b2nsfclbu.jpg',
    latitude: 10.753536,
    longtitude: 106.669586,
    is_available: true,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '116 Trần Hưng Đạo',
    ward_id: 21,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218435/mccsvwzs39pcour2qa0c.jpg',
    latitude: 10.752798,
    longtitude: 106.669395,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '67 An Dương Vương',
    ward_id: 18,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218450/irrhemdjjiwgmq1yukaa.jpg',
    latitude: 10.756962,
    longtitude: 106.67137,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '272 Trần Phú',
    ward_id: 18,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218467/cdumh9y2hhydekxg76cg.jpg',
    latitude: 10.75678,
    longtitude: 106.67344,
    is_available: true,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '22 An Dương Vương',
    ward_id: 19,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218482/rbh3qkjvlm0nggvlbmnu.jpg',
    latitude: 10.757356,
    longtitude: 106.67282,
    is_available: false,
    max_ads_panel: 3,
    is_deleted: false,
  },
  {
    address: '442 Đường Nguyễn Trãi',
    ward_id: 18,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218507/duu3hwibvsr7i16ipm1u.jpg',
    latitude: 10.755174,
    longtitude: 106.67196,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Công ty cổ phần công trình giao thông 60, 20C Trần Hưng Đạo',
    ward_id: 21,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218519/rio3ix7egarh9hsrdzsj.jpg',
    latitude: 10.752889,
    longtitude: 106.67148,
    is_available: true,
    max_ads_panel: 4,
    is_deleted: false,
  },
  {
    address: 'Sài Gòn Phố Palace, 1120 Võ Văn Kiệt',
    ward_id: 17,
    district_id: 5,
    spot_type_id: 4,
    ads_type_id: 2,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218535/gh5avwh7jrx7yroujzoi.jpg',
    latitude: 10.750609,
    longtitude: 106.66734,
    is_available: true,
    max_ads_panel: 3,
    is_deleted: false,
  },
  {
    address: 'Hàm Tử',
    ward_id: 23,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218550/i5r0vchpwqyq6ueoyiz0.jpg',
    latitude: 10.75069,
    longtitude: 106.66531,
    is_available: true,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '208 Phước Hưng',
    ward_id: 18,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 3,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218563/ifudqrmfsjgdopoc47ay.jpg',
    latitude: 10.755623,
    longtitude: 106.66858,
    is_available: false,
    max_ads_panel: 2,
    is_deleted: false,
  },
  {
    address: 'Cửa hàng Top & T, 31 Yết Kiêu',
    ward_id: 19,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218584/nfdsrvw6mu9fdboshfos.jpg',
    latitude: 10.758434,
    longtitude: 106.67271,
    is_available: false,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: 'Hyundai Gia Định, 8A Lý Thường Kiệt',
    ward_id: 20,
    district_id: 5,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218598/btzvtupock4haxwc9d1t.jpg',
    latitude: 10.757976,
    longtitude: 106.6617,
    is_available: true,
    max_ads_panel: 1,
    is_deleted: false,
  },
  {
    address: '218 Ngô Quyền',
    ward_id: 18,
    district_id: 6,
    spot_type_id: 1,
    ads_type_id: 1,
    image: 'http://res.cloudinary.com/dzjaj79nw/image/upload/v1705218615/sx3m7wppil2rmwqnbn9m.jpg',
    latitude: 10.763943,
    longtitude: 106.66451,
    is_available: true,
    max_ads_panel: 1,
    is_deleted: false,
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
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 2,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 3,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 4,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 5,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 6,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 7,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 8,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 9,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 10,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 11,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 12,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 13,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 14,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 15,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 16,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 17,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 18,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 19,
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
  {
    // id: 20
    ads_type_id: Math.floor(Math.random() * 9) + 1, // GET RANDOM ads_type
    height: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    width: Math.random() * (MAX - MIN) + MIN, // GET RANDOM FLOAT BETWEEN MIN, MAX
    expire_date: getDateNextMoth(), // THIS DATE next month
    ads_spot_id: Math.floor(Math.random() * ads_spot.length) + 1,
    image: '',
    is_deleted: false,
  },
];

// TODO
const information_change_request = []; //status 0: pending, 1: not approved, 2: approved

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
    email: 'vhtt@gmail.com',
    role: 0, // VH-TT
    name: 'admin',
    dob: '10/10/2002',
    username: 'admin',
    phone: '0377492045',
    password: Buffer.from('$2a$10$uR5S.P86tXoBfCHl0a03bePKyN/1yE/1oCW5oRNs/IYfbDeL.WY9O'),
    otp: '94f03302-849c-4e51-a7af-56da38c39595',
    expire_date: '2022-08-27T14:43:55.772Z',
    is_deleted: false,
  },
  {
    // id: 2,
    email: 'district1@gmail.com',
    role: 1, // District
    name: 'district',
    dob: '10/10/2002',
    username: 'district',
    phone: '0377492045',
    password: Buffer.from('$2a$10$uR5S.P86tXoBfCHl0a03bePKyN/1yE/1oCW5oRNs/IYfbDeL.WY9O'),
    otp: '7390f2c2-fa57-45a2-b1a9-ed848d28ada2',
    expire_date: '2022-08-27T14:43:55.772Z',
    is_deleted: false,
  },
  {
    // id: 3,
    email: 'ward1@gmail.com',
    role: 2, // ward
    name: 'ward',
    dob: '10/10/2002',
    username: 'ward',
    phone: '0377492045',
    password: Buffer.from('$2a$10$uR5S.P86tXoBfCHl0a03bePKyN/1yE/1oCW5oRNs/IYfbDeL.WY9O'),
    otp: '678d4a8e-0a5e-46ee-a75f-e929ad6d27a3',
    expire_date: '2022-08-27T14:43:55.772Z',
    is_deleted: false,
  },
];

const ads_license = [
  {
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    content: '&lt;p>CÔNG TY CỔ PHẦN ĐẦU TƯ SẢN XUẤT LÊ TRẦN&lt;/p>',
    user_id: Math.floor(Math.random() * 3) + 1,
    start_date: CURRENT_DATE,
    expire_date: getDateNextMoth(),
    status: 0,
    is_deleted: false,
    name: 'CÔNG TY CỔ PHẦN ĐẦU TƯ SẢN XUẤT LÊ TRẦN',
    email: 'letran@gmail.com',
    phone: '02838382342',
    address: '5 TRẦN BÌNH TRỌNG, PHƯ2ỜNG 1, QUẬN 5, TP. HCM',
    image: 'https://gurulocity.com/wp-content/uploads/2016/10/2016-Colgate-Print-Advertisement-732x1024.jpeg',
  },
  {
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    content: '&lt;p>CÔNG TY CỔ PHẦN ĐẦU TƯ SẢN XUẤT LÊ TRẦN&lt;/p>',
    user_id: Math.floor(Math.random() * 3) + 1,
    start_date: CURRENT_DATE,
    expire_date: getDateNextMoth(),
    status: 1,
    is_deleted: false,
    name: 'CÔNG TY TNHH MỘT THÀNH VIÊN SẢN XUẤT VÀ THƯƠNG MẠI LIỄU TÚ',
    email: 'lieutu@gmail.com',
    phone: '02838954814',
    address: '92 NGUYỄN BIỂU, PHƯỜNG 1, QUẬN 5, TP. HCM',
    image:
      'https://images.saymedia-content.com/.image/t_share/MTc2MjY0MjI5MTk4ODMyODMw/genders-role-in-advertisement-a-complete-analysis.jpg,https://naotw-pd.s3.amazonaws.com/styles/aotw_detail_ir/s3/mcdonalds_print_aotw.jpg?itok=MdS9M4oY',
  },
  {
    ads_panel_id: Math.floor(Math.random() * 9) + 1,
    content: '&lt;p>CÔNG TY CỔ PHẦN ĐẦU TƯ SẢN XUẤT LÊ TRẦN&lt;/p>',
    user_id: Math.floor(Math.random() * 3) + 1,
    start_date: CURRENT_DATE,
    expire_date: getDateNextMoth(),
    status: 2,
    is_deleted: false,
    name: 'CÔNG TY TNHH C.H MERAKI',
    email: 'meraki@gmail.com',
    phone: '02838954814',
    address: '42/43 Lê Lợi, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh',
    image: 'https://4.bp.blogspot.com/_NtCTAedaefg/TTSTwj5L-II/AAAAAAAAACc/PWwWHrKRwLE/s1600/Scan+110170009.jpg',
  },
];

// TODO user_district
const user_district = [
  {
    user_id: 2,
    district_id: 6,
  },
];

// TODO user_ward
const user_ward = [
  {
    user_id: 3,
    ward_id: 16,
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
