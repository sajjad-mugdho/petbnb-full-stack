import { Users } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { ILoginUser } from './user.interface';

const createUser = async (data: Users): Promise<Users> => {
  const { password, fullName, email, phone, role, imageUrl, pet } = data;

  const hashPassword = await bcrypt.hash(password, 12);
  const result = await prisma.users.create({
    data: {
      fullName,
      email,
      phone,
      role,
      imageUrl,
      pet,
      password: hashPassword,
    },
  });

  return result;
};

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not find in database');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Authentication failed. Incorrect password.'
    );
  }

  const { id: userId, role, email: userEmail } = user;
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

export const UserServices = {
  createUser,
  loginUser,
};
