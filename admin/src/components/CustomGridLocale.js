export const GRID_DEFAULT_LOCALE_TEXT = {
  // Root
  noRowsLabel: 'Không có dữ liệu',
  noResultsOverlayLabel: 'Không có kết quả nào được tìm thấy.',
  errorOverlayDefaultLabel: 'Đã xảy ra lỗi.',

  // Density selector toolbar button text
  toolbarDensity: 'Độ dày',
  toolbarDensityLabel: 'Độ dày',
  toolbarDensityCompact: 'Dày',
  toolbarDensityStandard: 'Bình thường',
  toolbarDensityComfortable: 'Thưa',

  // Columns selector toolbar button text
  toolbarColumns: 'Cột',
  toolbarColumnsLabel: 'Chọn cột',

  // Filters toolbar button text\
  toolbarFilters: 'Bộ lọc',
  toolbarFiltersLabel: 'Bộ lọc',
  toolbarFiltersTooltipHide: 'Ẩn bộ lọc',
  toolbarFiltersTooltipShow: 'Hiện bộ lọc',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} bộ lọc đang hoạt động` : `${count} bộ lọc đang hoạt động`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Tìm kiếm…',
  toolbarQuickFilterLabel: 'Tìm kiếm',
  toolbarQuickFilterDeleteIconLabel: 'Xóa',

  // Export selector toolbar button text
  toolbarExport: 'Xuất',
  toolbarExportLabel: 'Xuất',
  toolbarExportCSV: 'Tải xuống CSV',
  toolbarExportPrint: 'In',
  toolbarExportExcel: 'Tải xuống Excel',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Tìm kiếm cột',
  columnsPanelTextFieldPlaceholder: 'Tiêu đề cột',
  columnsPanelDragIconLabel: 'Sắp xếp thứ tự cột',
  columnsPanelShowAllButton: 'Hiện tất cả',
  columnsPanelHideAllButton: 'Ẩn tất cả',

  // Filter panel text
  filterPanelAddFilter: 'Thêm bộ lọc',
  filterPanelDeleteIconLabel: 'Xóa',
  filterPanelLinkOperator: 'Toán tử logic',
  filterPanelOperators: 'Toán tử',
  filterPanelOperator: 'Toán tử',
  filterPanelOperatorAnd: 'Và',
  filterPanelOperatorOr: 'Hoặc',
  filterPanelColumns: 'Cột',
  filterPanelInputLabel: 'Giá trị',
  filterPanelInputPlaceholder: 'Giá trị bộ lọc',

  // Filter operators text
  filterOperatorContains: 'chứa',
  filterOperatorEquals: 'bằng',
  filterOperatorStartsWith: 'bắt đầu với',
  filterOperatorEndsWith: 'kết thúc với',
  filterOperatorIs: 'là',
  filterOperatorNot: 'không phải',
  filterOperatorAfter: 'sau',
  filterOperatorOnOrAfter: 'trên hoặc sau',
  filterOperatorBefore: 'trước',
  filterOperatorOnOrBefore: 'trên hoặc trước',
  filterOperatorIsEmpty: 'rỗng',
  filterOperatorIsNotEmpty: 'không rỗng',
  filterOperatorIsAnyOf: 'là bất kỳ của',

  // Filter values text
  filterValueAny: 'bất kỳ',
  filterValueTrue: 'đúng',
  filterValueFalse: 'sai',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Hiện cột',
  columnMenuFilter: 'Bộ lọc',
  columnMenuHideColumn: 'Ẩn',
  columnMenuUnsort: 'Bỏ sắp xếp',
  columnMenuSortAsc: 'Sắp xếp tăng dần',
  columnMenuSortDesc: 'Sắp xếp giảm dần',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} bộ lọc đang hoạt động` : `${count} bộ lọc đang hoạt động`,
  columnHeaderFiltersLabel: 'Hiện bộ lọc',
  columnHeaderSortIconLabel: 'Sắp xếp',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} hàng được chọn`
      : `${count.toLocaleString()} hàng được chọn`,

  // Total row amount footer text
  footerTotalRows: 'Tổng số hàng:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} của ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Chọn checkbox',
  checkboxSelectionSelectAllRows: 'Chọn tất cả',
  checkboxSelectionUnselectAllRows: 'Bỏ chọn tất cả',
  checkboxSelectionSelectRow: 'Chọn hàng',
  checkboxSelectionUnselectRow: 'Bỏ chọn hàng',

  // Boolean cell text
  booleanCellTrueLabel: 'có',
  booleanCellFalseLabel: 'không',

  // Actions cell more text
  actionsCellMore: 'hơn',

  // Column pinning text
  pinToLeft: 'Ghim bên trái',
  pinToRight: 'Ghim bên phải',
  unpin: 'Bỏ ghim',

  // Tree Data
  treeDataGroupingHeaderName: 'Nhóm',
  treeDataExpand: 'Xem thêm',
  treeDataCollapse: 'Ẩn bớt',

  // Grouping columns
  groupingColumnHeaderName: 'Nhóm',
  groupColumn: (name) => `Nhóm theo ${name}`,
  unGroupColumn: (name) => `Ngừng nhóm theo ${name}`,

  // Master/detail
  detailPanelToggle: 'Chi tiết',
  expandDetailPanel: 'Mở rộng',
  collapseDetailPanel: 'Thu gọn',

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: 'Sắp xếp hàng',

  // Aggregation
  aggregationMenuItemHeader: 'Tổng hợp',
  aggregationFunctionLabelSum: 'Tổng',
  aggregationFunctionLabelAvg: 'Trung bình',
  aggregationFunctionLabelMin: 'Nhỏ nhất',
  aggregationFunctionLabelMax: 'Lớn nhất',
  aggregationFunctionLabelSize: 'Kích thước',
}
