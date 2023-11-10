export type IBookingFiltersRequest = {
  searchTerm?: string;
};
export const BookingFilterableFields: string[] = [
  'searchTerm',
  'availableSeat',
  'services',
  'isBooked',
  'city',
];

export const BookingSearchableFields: string[] = [
  'fullName',
  'availableSeat',
  'services',
  'isBooked',
  'city',
];
