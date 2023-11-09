import { AvailableHost, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import {
  AvailableHostSearchableFields,
  IAvailableHostFiltersRequest,
} from './availableHost.constant';

const createHost = async (data: AvailableHost): Promise<AvailableHost> => {
  const result = await prisma.availableHost.create({
    data,
  });

  return result;
};

const getAllAvailableHosts = async (
  filters: IAvailableHostFiltersRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AvailableHost[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: AvailableHostSearchableFields.map(field => ({
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

  const whereConditions: Prisma.AvailableHostWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.availableHost.findMany({
    where: whereConditions,
    include: {
      AvailableService: {
        include: {
          availableHost: true,
          services: true,
          timeSlots: true,
        },
      },
      hosts: true,
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

  const total = await prisma.availableHost.count({
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

const getAvailableHost = async (id: string): Promise<AvailableHost | null> => {
  const result = await prisma.availableHost.findUnique({
    where: {
      id,
    },
    include: {
      AvailableService: {
        include: {
          availableHost: true,
          services: true,
          timeSlots: true,
        },
      },
      hosts: true,
      timeSlots: true,
    },
  });

  return result;
};

const updateAvailableHost = async (
  id: string,
  availableHost: Partial<AvailableHost>
): Promise<AvailableHost> => {
  const result = await prisma.availableHost.update({
    where: {
      id: id,
    },
    data: availableHost,
  });
  return result;
};

const deleteAvailableHost = async (id: string): Promise<AvailableHost> => {
  const result = await prisma.availableHost.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const AvailableHostService = {
  createHost,
  getAllAvailableHosts,
  getAvailableHost,
  updateAvailableHost,
  deleteAvailableHost,
};
