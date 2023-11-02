import { Admins } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AdminService } from './admins.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.createAdmin(req.body);

  sendResponse<Admins>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Created Sucssesfully',
    data: result,
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
};
