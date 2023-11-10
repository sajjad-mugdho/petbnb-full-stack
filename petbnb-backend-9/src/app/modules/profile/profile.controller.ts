import { Profile } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getAllProfiles = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getAllProfiles();

  sendResponse<Profile>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile all retrive successfully',
    data: result,
  });
});
const getSingleprofile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getSingleprofile(req.params.id);

  sendResponse<Profile>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrive successfully',
    data: result,
  });
});
const updateprofile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.updateprofile(req.params.id, req.body);

  sendResponse<Profile>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile update successfully',
    data: result,
  });
});
const deleteProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.updateprofile(req.params.id, req.body);

  sendResponse<Profile>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile deleted successfully',
    data: result,
  });
});

export const ProfileController = {
  getAllProfiles,
  getSingleprofile,
  updateprofile,
  deleteProfile,
};
