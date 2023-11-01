import { Hosts, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { IHostFiltersRequest, hostSearchableFields } from './host.constant';

const getHosts = async (
  filters: IHostFiltersRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: hostSearchableFields.map(field => ({
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
  const whereConditions: Prisma.HostsWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.hosts.findMany({
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

  const total = await prisma.hosts.count({
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

const getHostById = async (id: string): Promise<Hosts | null> => {
  const result = await prisma.hosts.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateHost = async (
  id: string,
  payload: Partial<Hosts>
): Promise<Hosts> => {
  const result = await prisma.hosts.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteHost = async (id: string): Promise<Hosts | null> => {
  const result = await prisma.hosts.delete({
    where: {
      id,
    },
  });

  return result;
};

export const HostService = {
  getHosts,
  getHostById,
  updateHost,
  deleteHost,
};
