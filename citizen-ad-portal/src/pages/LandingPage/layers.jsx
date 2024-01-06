export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#51bbd6',
      100,
      '#f1f075',
      750,
      '#f28cb1',
    ],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 50, 750, 60],
  },
};

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['Roboto Regular'],
    'text-size': 12,
  },
};

// export const unclusteredPointLayer = {
//   id: 'unclustered-point',
//   type: 'circle',
//   source: 'earthquakes',
//   filter: ['!', ['has', 'point_count']],
//   paint: {
//     'circle-color': '#11b4da',
//     'circle-radius': 4,
//     'circle-stroke-width': 1,
//     'circle-stroke-color': '#fff',
//   },
// };

export const unclusteredPointCircle = {
  id: 'uncluster-point',
  type: 'circle',
  source: 'earthquakes',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#11b4da',
    'circle-radius': 20,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff',
  },
  layout: {
    'text-field': 'QC',
  },
};

export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'symbol',
  source: 'earthquakes',
  filter: ['!', ['has', 'point_count']],
  layout: {
    'icon-image': 'custom-marker', // Tên của hình ảnh biểu tượng tùy chỉnh
    'icon-allow-overlap': true,
    'icon-size': 0.5,
    'text-field': 'QC',
    'text-font': ['Roboto Regular'],
    'text-size': 12,
    'text-offset': [0, 0.5], // Điều chỉnh vị trí văn bản trong biểu tượng
    'text-anchor': 'bottom', // Chỉ định nơi văn bản được căn chỉnh trên biểu tượng
  },
};
