import { Prisma, Users } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { IUserFiltersRequest, usersSearchableFields } from './users.constant';

const getUsers = async (
  filters: IUserFiltersRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: usersSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: {
          equals: value,
        },
      })),
    });
  }
  const whereConditions: Prisma.UsersWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.users.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.users.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getUserById = async (id: string): Promise<Users | null> => {
  const result = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<Users>
): Promise<Users> => {
  const result = await prisma.users.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteUser = async (id: string): Promise<Users | null> => {
  const result = await prisma.users.delete({
    where: {
      id,
    },
  });

  return result;
};

export const UserService = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
