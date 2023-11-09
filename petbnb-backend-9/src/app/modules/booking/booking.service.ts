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

const cancelBooking = async (bookingId: string) => {
  const booked = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booked) {
    throw new Error('Appointment does not exist');
  }

  if (booked.status === 'REJECTED') {
    throw new Error('Appointment has already been cancelled');
  }

  if (booked.status === 'COMPLITED') {
    throw new Error('Appointment has already been completed');
  }

  const canceledBooking = await prisma.$transaction(async transactionClient => {
    const bookingToCancel = await transactionClient.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: 'REJECTED',
      },
    });

    const availableService =
      await transactionClient.availableService.findUnique({
        where: {
          id: booked.availableServiceId,
        },
      });

    await transactionClient.availableService.update({
      where: {
        id: booked.availableServiceId,
      },
      data: {
        availableSeat: {
          increment: 1,
        },

        isBooked:
          availableService && availableService.availableSeat + 1 > 0
            ? false
            : true,
      },
    });

    await transactionClient.payment.update({
      where: {
        id: bookingId,
      },
      data: {
        paymentStatus: 'REJECTED',
      },
    });

    return {
      appointment: bookingToCancel,
    };
  });

  return canceledBooking;
};

export const BookingService = {
  createBooking,
  cancelBooking,
};
