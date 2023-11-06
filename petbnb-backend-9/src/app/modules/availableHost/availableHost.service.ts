import { AvailableHost } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createHost = async (data: AvailableHost): Promise<AvailableHost> => {
  const result = await prisma.availableHost.create({
    data,
  });

  return result;
};

export const AvailableHostService = {
  createHost,
};
