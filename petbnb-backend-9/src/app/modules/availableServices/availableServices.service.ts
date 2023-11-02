import { AvailableService } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (
  data: AvailableService
): Promise<AvailableService> => {
  const result = await prisma.availableService.create({
    data,
  });

  return result;
};

const getAllAvailableServices = async (): Promise<AvailableService[]> => {
  const result = await prisma.availableService.findMany();
  return result;
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
