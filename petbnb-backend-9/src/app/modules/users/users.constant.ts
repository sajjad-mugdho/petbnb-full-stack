export type IUserFiltersRequest = {
  searchTerm?: string;
};
export const usersFilterableFields: string[] = [
  'searchTerm',
  'fullName',
  'email',
  'phone',
  'gender',
];

export const usersSearchableFields: string[] = [
  'fullName',
  'email',
  'phone',
  'studentId',
];
