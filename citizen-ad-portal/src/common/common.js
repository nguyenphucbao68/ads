export const getFormattedAddress = (address, ward, district) => {
  return [address, ward, district].join(', ');
};
