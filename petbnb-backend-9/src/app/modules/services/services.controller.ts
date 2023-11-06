import { Services } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ServicesBNB } from './services.service';

const createService = catchAsync(async (req: Request, res: Response) => {
  const { ...serviceData } = req.body;
  const result = await ServicesBNB.createService(serviceData);
  console.log(serviceData);

  sendResponse<Services>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Created Sucssesfully',
    data: result,
  });
});

const getServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServicesBNB.getServices();

  sendResponse<Services[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services Retrives Sucssesfully',
    data: result,
  });
});

const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const result = await ServicesBNB.getServiceById(req.params.id);

  sendResponse<Services>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Retrives Sucssesfully',
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { ...updatedData } = req.body;
  const id = req.params.id;

  const result = await ServicesBNB.updateService(id, updatedData);
  sendResponse<Services>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Updated Sucssesfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServicesBNB.deleteService(req.params.id);

  sendResponse<Services>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Deleted Sucssesfully',
    data: result,
  });
});

export const ControllerBNB = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
