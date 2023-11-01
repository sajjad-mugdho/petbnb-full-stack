import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { usersFilterableFields } from './users.constant';
import { UserService } from './users.service';

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, usersFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await UserService.getUsers(filters, options);

  console.log('result', result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users Retrive Succsessfully',
    data: result,
  });
});

export const UserController = {
  getUsers,
};
