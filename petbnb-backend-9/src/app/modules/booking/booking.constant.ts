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
  'payment',
  'availableSeat',
  'services',
  'isBooked',
  'city',
];
