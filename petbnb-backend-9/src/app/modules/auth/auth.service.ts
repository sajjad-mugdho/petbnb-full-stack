import { Hosts, Users } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { ILoginUser, IRefreshTokenResponse } from './auth.interface';

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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  const isUserExist = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
      email: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

// Host part

const createHost = async (data: Hosts): Promise<Hosts> => {
  const {
    password,
    fullName,
    email,
    phone,
    role,
    imageUrl,
    preferredPet,
    address,
  } = data;

  const hashPassword = await bcrypt.hash(password, 12);
  const result = await prisma.hosts.create({
    data: {
      fullName,
      email,
      phone,
      role,
      imageUrl,
      preferredPet,
      address,

      password: hashPassword,
    },
  });

  return result;
};
const loginHost = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const host = await prisma.hosts.findUnique({
    where: {
      email,
    },
  });

  if (!host) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Host not find in database');
  }

  const passwordMatch = await bcrypt.compare(password, host.password);
  if (!passwordMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Authentication failed. Incorrect password.'
    );
  }

  const { id: userId, role, email: userEmail } = host;
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

export const AuthServices = {
  createUser,
  loginUser,
  refreshToken,
  createHost,
  loginHost,
};
