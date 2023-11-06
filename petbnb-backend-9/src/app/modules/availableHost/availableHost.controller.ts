import { AvailableHost } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const AvailableHostController = {
  createHost,
};
