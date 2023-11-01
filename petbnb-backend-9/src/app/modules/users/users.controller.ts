/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserServices } from './users.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUser(req.body);

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
  const result = await UserServices.loginUser(loginData);
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

export const UsersController = {
  createUser,
  loginUser,
};
