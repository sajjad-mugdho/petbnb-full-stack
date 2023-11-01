/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createUser(req.body);

  // eslint-disable-next-line no-unused-vars
  const { password, ...data } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: data,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthServices.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // Refresh Token

  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOption);

  res.status(200).send({
    success: true,
    statusCode: 200,
    message: 'User signin successfully!',
    token: others.accessToken,
  });
});

const createHost = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createUser(req.body);

  // eslint-disable-next-line no-unused-vars
  const { password, ...data } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Host Created Successfully',
    data: data,
  });
});

const loginHost = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthServices.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // Refresh Token

  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOption);

  res.status(200).send({
    success: true,
    statusCode: 200,
    message: 'User signin successfully!',
    token: others.accessToken,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  res.status(200).send({
    success: true,
    statusCode: 200,
    message: 'User signin successfully!',
    token: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
  createHost,
  loginHost,
};
