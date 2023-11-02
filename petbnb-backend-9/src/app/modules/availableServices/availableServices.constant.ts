export type IAvailableServiceFiltersRequest = {
  searchTerm?: string;
};
export const AvailableSercicesFilterableFields: string[] = [
  'searchTerm',
  'availableSeat',
  'services',
  'isBooked',
  'city',
];

export const AvailableSercicesSearchableFields: string[] = [
  'fullName',
  'availableSeat',
  'services',
  'isBooked',
  'city',
];
