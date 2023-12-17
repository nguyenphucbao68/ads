import React from 'react'
import UserCreatePage from './pages/user/create'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AdsSpotDetails = React.lazy(() => import('./views/admin/adsSpots/AdsSpotDetails'))
const AdsPanelTypeDetail = React.lazy(() =>
  import('./views/admin/adsPanelTypes/AdsPanelTypeDetail'),
)
const AdsPanelTypeUpdate = React.lazy(() =>
  import('./views/admin/adsPanelTypes/AdsPanelTypeUpdate'),
)
const AdsSpotList = React.lazy(() => import('./views/admin/adsSpots/AdsSpotList'))
const AdsPanelTypeList = React.lazy(() => import('./views/admin/adsPanelTypes/AdsPanelTypeList'))
const SpotTypeList = React.lazy(() => import('./views/admin/spotTypes/SpotTypeList'))
const ReportTypeList = React.lazy(() => import('./views/admin/reportTypes/ReportTypeList'))
const AdsTypeList = React.lazy(() => import('./views/admin/adsTypes/AdsTypeList'))
const AdsPanelList = React.lazy(() => import('./views/admin/adsPanels/AdsPanelList'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  // Statistics
  { path: '/statistics', name: 'Statistics', element: Dashboard },

  // Admin
  { path: '/admin', name: 'Admin', exact: true },
  { path: '/admin/wards', name: 'Wards', element: Dashboard },
  { path: '/admin/districts', name: 'Districts', element: Dashboard },
  { path: '/admin/types', name: 'Types', element: AdsSpotList },
  { path: '/admin/ads_spots', name: 'Ads Spots', element: AdsSpotList },
  { path: '/admin/ads_spots/:id', name: 'Ads Spot Details', element: AdsSpotDetails },
  {
    path: '/admin/ads_panel_types/:id/update',
    name: 'Ads Panel Types Update',
    element: AdsPanelTypeUpdate,
  },
  {
    path: '/admin/ads_panel_types/create',
    name: 'Ads Panel Types Create',
    element: AdsPanelTypeUpdate,
  },
  {
    path: '/admin/ads_panel_types/:id',
    name: 'Ads Panel Types Details',
    element: AdsPanelTypeDetail,
  },
  { path: '/admin/ads_panels', name: 'Ads Panels', element: AdsPanelList },
  { path: '/admin/spot_types', name: 'Ads Panel Types', element: SpotTypeList },
  { path: '/admin/report_types', name: 'Report Types', element: ReportTypeList },
  { path: '/admin/ads_types', name: 'Ads Types', element: AdsTypeList },
  { path: '/admin/ads_panel_types', name: 'Ads Panel Types', element: AdsPanelTypeList },
  { path: '/admin/create_account', name: 'Create Account', element: Dashboard },
  { path: '/admin/assign_location', name: 'Assign Location', element: Dashboard },
  { path: '/admin/approval', name: 'Approval', exact: true },
  { path: '/admin/approval/edit_requests', name: 'Edit Requests Approval', element: Dashboard },
  { path: '/admin/approval/ads_permissons', name: 'Ads Permissions Approval', element: Dashboard },

  // Profile
  { path: '/profile', name: 'Profile', exact: true },
  { path: '/profile/info', name: 'Profile Info', element: Dashboard },
  { path: '/profile/edit', name: 'Profile Edit', element: Dashboard },
  { path: '/profile/change_password', name: 'Change Password', element: Dashboard },

  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
