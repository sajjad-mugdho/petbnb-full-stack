import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const createBooking = async (
  userId: string,
  availableServiceId: string,
  availableDate: string
): Promise<any> => {
  const availableService = await prisma.availableService.findFirst({
    where: {
      id: availableServiceId,
    },
  });

  if (!availableService) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Available Service is not Available'
    );
  }

  if (availableService?.availableSeat === 0) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This service is fully booked');
  }

  const booking = await prisma.$transaction(async transactionClient => {
    const booked = await transactionClient.booking.create({
      data: {
        availableServiceId,
        userId,
        availableDate,
        status: 'PENDING',
      },
    });
    await transactionClient.availableService.update({
      where: {
        id: availableServiceId,
      },
      data: {
        availableSeat: availableService.availableSeat - 1,

        isBooked:
          availableService && availableService.availableSeat - 1 === 0
            ? true
            : false,
      },
    });

    const payment = await transactionClient.payment.create({
      data: {
        amount: availableService?.fees,
        paymentStatus: 'PENDING',
        bookedId: booked.id,
      },
    });
    return {
      booked: booked,
      payment: payment,
    };
  });

  return booking;
};

export const BookingService = {
  createBooking,
};
