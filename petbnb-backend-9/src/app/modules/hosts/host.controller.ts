import { Hosts } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { usersFilterableFields } from '../users/users.constant';
import { HostService } from './host.service';

const getHosts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, usersFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await HostService.getHosts(filters, options);

  console.log('result', result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hosts Retrive Succsessfully',
    data: result,
  });
});

const getHostById = catchAsync(async (req: Request, res: Response) => {
  const result = await HostService.getHostById(req.params.id);

  sendResponse<Hosts>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hosts Retrive Succsessfully',
    data: result,
  });
});

const updateHost = catchAsync(async (req: Request, res: Response) => {
  const { ...updatedData } = req.body;
  const id = req.params.id;

  const result = await HostService.updateHost(id, updatedData);

  sendResponse<Hosts>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hosts Updated Succsessfully',
    data: result,
  });
});
const deleteHost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await HostService.deleteHost(id);

  sendResponse<Hosts>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hosts Deleted Succsessfully',
    data: result,
  });
});

export const HostController = {
  getHosts,
  getHostById,
  updateHost,
  deleteHost,
};
