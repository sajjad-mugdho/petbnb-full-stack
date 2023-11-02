import { AvailableService } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AvailableService_Service } from './availableServices.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AvailableService_Service.insertIntoDB(req.body);

  sendResponse<AvailableService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Service created',
    data: result,
  });
});

const getAllAvailableServices = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AvailableService_Service.getAllAvailableServices();

    sendResponse<AvailableService[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Avialable Service Retrived',
      data: result,
    });
  }
);

const getAvailableService = catchAsync(async (req: Request, res: Response) => {
  const result = await AvailableService_Service.getAvailableService(
    req.params.id
  );

  sendResponse<AvailableService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Avialable Service Retrived Succsessfully',
    data: result,
  });
});

const updateAvailableServices = catchAsync(
  async (req: Request, res: Response) => {
    const { ...updateData } = req.body;
    const id = req.params.id;
    const result = await AvailableService_Service.updateAvailableServices(
      id,
      updateData
    );

    sendResponse<AvailableService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update Avialable Service Succsessfully',
      data: result,
    });
  }
);

const deleteAvailableservice = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AvailableService_Service.deleteAvailableservice(
      req.params.id
    );

    sendResponse<AvailableService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Avialable Service Succsessfully',
      data: result,
    });
  }
);
export const AvailableServiceController = {
  insertIntoDB,
  getAllAvailableServices,
  getAvailableService,
  updateAvailableServices,
  deleteAvailableservice,
};
