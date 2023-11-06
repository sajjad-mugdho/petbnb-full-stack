import { Services } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createService = async (data: Services): Promise<Services> => {
  const result = await prisma.services.create({
    data,
  });

  return result;
};

const getServices = async (): Promise<Services[]> => {
  const result = await prisma.services.findMany({
    include: {
      availableServices: true,
    },
  });

  return result;
};

const getServiceById = async (id: string) => {
  const result = await prisma.services.findUnique({
    where: {
      id,
    },
    include: {
      availableServices: true,
    },
  });

  return result;
};

const updateService = async (
  id: string,
  payload: Partial<Services>
): Promise<Services> => {
  const result = await prisma.services.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteService = async (id: string): Promise<Services> => {
  const result = await prisma.services.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ServicesBNB = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
