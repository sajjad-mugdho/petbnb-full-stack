import { Admins } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AdminService } from './admins.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.createAdmin(req.body);

  // eslint-disable-next-line no-unused-vars
  const { password, ...data } = result;
  sendResponse<Partial<Admins>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Created Sucssesfully',
    data: data,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  console.log(loginData);
  const result = await AdminService.loginAdmin(loginData);
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
    message: 'Admin signin successfully!',
    token: others.accessToken,
  });
});

const getAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAdmins();

  sendResponse<Admins[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins Retrives Sucssesfully',
    data: result,
  });
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAdminById(req.params.id);

  sendResponse<Admins>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Retrives Sucssesfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...updatedData } = req.body;
  const id = req.params.id;

  const result = await AdminService.updateAdmin(id, updatedData);
  sendResponse<Admins>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Updated Sucssesfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.deleteAdmin(req.params.id);

  sendResponse<Admins>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Deleted Sucssesfully',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
};
