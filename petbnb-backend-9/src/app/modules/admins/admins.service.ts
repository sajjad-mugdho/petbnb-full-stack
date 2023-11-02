import { Admins } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createAdmin = async (data: Admins): Promise<Admins> => {
  const result = await prisma.admins.create({
    data,
  });

  return result;
};

const getAdmins = async (): Promise<Admins[]> => {
  const result = await prisma.admins.findMany();

  return result;
};

const getAdminById = async (id: string) => {
  const result = await prisma.admins.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<Admins>
): Promise<Admins> => {
  const result = await prisma.admins.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteAdmin = async (id: string): Promise<Admins> => {
  const result = await prisma.admins.delete({
    where: {
      id,
    },
  });

  return result;
};

export const AdminService = {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
