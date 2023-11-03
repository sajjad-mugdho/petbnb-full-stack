import { Payment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { paymentServices } from './payment.service';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { ...paymentData } = req.body;
  const result = await paymentServices.createPayment(paymentData);

  sendResponse<Payment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Success',
    data: result,
  });
});

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentServices.getAllPayments();
  sendResponse<Payment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Retrive Successfully',
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await paymentServices.getSinglePayment(id);
  sendResponse<Payment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Retrive Successfully',
    data: result,
  });
});

const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...paymentData } = req.body;
  const result = await paymentServices.updatePayment(id, paymentData);
  sendResponse<Payment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Updated Successfully',
    data: result,
  });
});

const deletePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await paymentServices.deletePayment(id);

  sendResponse<Payment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Updated Successfully',
    data: result,
  });
});
export const PaymentController = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
