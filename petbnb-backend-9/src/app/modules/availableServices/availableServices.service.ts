import { AvailableService, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import {
  AvailableSercicesSearchableFields,
  IAvailableServiceFiltersRequest,
} from './availableServices.constant';

const insertIntoDB = async (
  data: AvailableService
): Promise<AvailableService> => {
  const result = await prisma.availableService.create({
    data,
  });

  return result;
};

const getAllAvailableServices = async (
  filters: IAvailableServiceFiltersRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: AvailableSercicesSearchableFields.map(field => ({
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

  const whereConditions: Prisma.AvailableServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.availableService.findMany({
    where: whereConditions,
    include: {
      availableHost: {
        include: {
          AvailableService: true,
          hosts: true,
          reviews: true,
          timeSlots: true,
        },
      },
      bookings: {
        include: {
          availableService: true,
          payments: true,
          users: true,
        },
      },
      services: true,
      timeSlots: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.availableService.count({
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

const getAvailableService = async (
  id: string
): Promise<AvailableService | null> => {
  const result = await prisma.availableService.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateAvailableServices = async (
  id: string,
  payload: Partial<AvailableService>
): Promise<AvailableService> => {
  const result = await prisma.availableService.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteAvailableservice = async (
  id: string
): Promise<AvailableService> => {
  const result = await prisma.availableService.delete({
    where: {
      id,
    },
  });
  return result;
};
export const AvailableService_Service = {
  insertIntoDB,
  getAllAvailableServices,
  getAvailableService,
  updateAvailableServices,
  deleteAvailableservice,
};
