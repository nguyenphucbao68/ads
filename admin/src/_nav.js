import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
  cilNotes,
  cilPenAlt,
  cilPenNib,
  cilSpeedometer,
  cilUser,
  cilUserPlus,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { ReactComponent as AdministratorApprovalIcon } from 'src/assets/icons/administrative_approval.svg'

const _nav = [
  {
    component: CNavItem,
    name: 'Trang chủ',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
    role: 0, //0: all, 1: Phường quận, 2: sở vhtt
  },

  {
    component: CNavTitle,
    name: 'Thống kê',
    role: 2,
  },
  {
    role: 2,
    component: CNavItem,
    name: 'Thống kê',
    to: '/statistics',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    role: 0,
    component: CNavTitle,
    name: 'Quản lý',
  },
  {
    role: 0,
    component: CNavGroup,
    name: 'Quản lý',
    to: '/admin',
    icon: <CIcon icon={cilPenAlt} customClassName="nav-icon" />,

    items: [
      {
        role: 2,
        component: CNavItem,
        name: 'Phường',
        to: '/admin/wards',
      },
      {
        role: 2,
        component: CNavItem,
        name: 'Quận',
        to: '/admin/districts',
      },
      {
        role: 2,
        component: CNavItem,
        name: 'Loại đất',
        to: '/admin/spot_types',
      },
      {
        role: 2,
        component: CNavItem,
        name: 'Loại báo cáo',
        to: '/admin/report_types',
      },
      {
        role: 2,
        component: CNavItem,
        name: 'Loại hình quảng cáo',
        to: '/admin/ads_types',
      },
      {
        role: 2,
        component: CNavItem,
        name: 'Loại bảng quảng cáo',
        to: '/admin/ads_panel_types',
      },
      {
        role: 0,
        component: CNavItem,
        name: 'Điểm đặt quảng cáo',
        to: '/admin/ads_spots',
      },
      {
        role: 0,
        component: CNavItem,
        name: 'Bảng quảng cáo',
        to: '/admin/ads_panels',
      },
    ],
  },
  {
    role: 0,
    component: CNavGroup,
    name: 'Xét duyệt',
    to: '/admin/approval',
    icon: (
      <AdministratorApprovalIcon
        style={{
          color: '#ffffff',
          height: '30px',
          width: '30px',
          marginRight: '15px',
        }}
      />
    ),
    items: [
      // {
      //   role: 1,
      //   component: CNavItem,
      //   name: 'Tạo yêu cầu chỉnh sửa',
      //   to: '/admin/approval/edit_requests/create',
      // },
      {
        role: 0,
        component: CNavItem,
        name: 'Yêu cầu chỉnh sửa',
        to: '/admin/approval/edit_requests',
      },
      {
        role: 0,
        component: CNavItem,
        name: 'Cấp phép quảng cáo',
        to: '/admin/approval/ads_licenses',
      },
    ],
  },
  {
    role: 1,
    component: CNavItem,
    name: 'Báo cáo của người dân',
    to: '/admin/report',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    role: 2,
    component: CNavItem,
    name: 'Tạo tài khoản',
    to: '/admin/create_account',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
  {
    role: 2,
    component: CNavItem,
    name: 'Phân công khu vực',
    to: '/admin/assign_location',
    icon: <CIcon icon={cilPenNib} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavTitle,
  //   name: 'Thông tin người dùng',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Cá nhân',
  //   to: '/profile',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Thông tin cá nhân',
  //       to: '/profile/info',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Cập nhật thông tin',
  //       to: '/profile/edit',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Đổi mật khẩu',
  //       to: '/profile/change_password',
  //     },
  //   ],
  // },
  // {
  //   component: CNavTitle,
  //   name: 'MODULES',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Users',
  //   to: '/U',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Create',
  //       to: '/users/create',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'List',
  //       to: '/base/breadcrumbs',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Advertising Spots',
  //   to: '/U',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Create',
  //       to: '/base/accordion',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'List',
  //       to: '/base/breadcrumbs',
  //     },
  //   ],
  // },
  // {
  //   component: CNavTitle,
  //   name: 'TYPE',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Base',
  //   to: '/base',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Accordion',
  //       to: '/base/accordion',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Breadcrumb',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Carousel',
  //       to: '/base/carousels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Collapse',
  //       to: '/base/collapses',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'List group',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Navs & Tabs',
  //       to: '/base/navs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Pagination',
  //       to: '/base/paginations',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Placeholders',
  //       to: '/base/placeholders',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Progress',
  //       to: '/base/progress',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Spinners',
  //       to: '/base/spinners',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
