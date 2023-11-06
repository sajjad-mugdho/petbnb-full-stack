import { Admins } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { prisma } from '../../../shared/prisma';
import { ILoginUser } from '../auth/auth.interface';

const createAdmin = async (data: Admins): Promise<Admins> => {
  const { password, fullName, email, imageUrl, phone, role } = data;

  const hashpassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );
  const result = await prisma.admins.create({
    data: {
      fullName,
      email,
      imageUrl,
      phone,
      role,
      password: hashpassword,
    },
  });

  return result;
};

const loginAdmin = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const admin = await prisma.admins.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Admin not find in database');
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);
  if (!passwordMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Authentication failed. Incorrect password.'
    );
  }

  const { id: userId, role, email: userEmail } = admin;
  const accessToken = jwtHelpers.createToken(
    { userId, role, userEmail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role, userEmail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
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
  loginAdmin,
};
