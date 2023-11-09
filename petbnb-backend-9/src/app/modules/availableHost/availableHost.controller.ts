import { AvailableHost } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AvailableHostFilterableFields } from './availableHost.constant';
import { AvailableHostService } from './availableHost.service';

const createHost = catchAsync(async (req: Request, res: Response) => {
  const result = await AvailableHostService.createHost(req.body);

  sendResponse<AvailableHost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Host created successfully',
    data: result,
  });
});

const getAllAvailableHosts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AvailableHostFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AvailableHostService.getAllAvailableHosts(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Host Retrive successfully',
    data: result,
  });
});

const getAvailableHost = catchAsync(async (req: Request, res: Response) => {
  const result = await AvailableHostService.getAvailableHost(req.params.id);
  sendResponse<AvailableHost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Host Retrive successfully',
    data: result,
  });
});

const updateAvailableHost = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const id = req.params.id;
  const result = await AvailableHostService.updateAvailableHost(id, data);

  sendResponse<AvailableHost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Host Updated successfully',
    data: result,
  });
});

const deleteAvailableHost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AvailableHostService.deleteAvailableHost(id);

  sendResponse<AvailableHost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Host deleted successfully',
    data: result,
  });
});
export const AvailableHostController = {
  createHost,
  getAllAvailableHosts,
  getAvailableHost,
  updateAvailableHost,
  deleteAvailableHost,
};
