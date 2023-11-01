export type IHostFiltersRequest = {
  searchTerm?: string;
};
export const hostFilterableFields: string[] = [
  'searchTerm',
  'fullName',
  'email',
  'phone',
  'gender',
  'address',
  'preferredPet',
];

export const hostSearchableFields: string[] = [
  'fullName',
  'email',
  'phone',
  'address',
  'pet',
];
