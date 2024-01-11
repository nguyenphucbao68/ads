export const getFormattedAddress = (address, ward, district) => {
  return [address, ward, district].join(', ');
};

export const updateLocalStorage = (key, val) => {
  let reportedItems = localStorage.getItem(key) || '[]';
  reportedItems = JSON.parse(reportedItems);
  reportedItems.push(val);
  localStorage.setItem(key, JSON.stringify(reportedItems));
};
