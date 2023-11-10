/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import {
  BookingFilterableFields,
  IBookingFiltersRequest,
} from './booking.constant';

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
        status: 'pending',
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

const cancelBooking = async (bookingId: string): Promise<any> => {
  const booked = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booked) {
    throw new Error('Appointment does not exist');
  }

  if (booked.status === 'cancelled') {
    throw new Error('Appointment has already been cancelled');
  }

  if (booked.status === 'finished') {
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

const startBooking = async (bookingId: string): Promise<any> => {
  const booked = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booked) {
    throw new Error('Booking does not exist');
  }

  if (booked.status === 'cancelled') {
    throw new Error('Booking has already been cancelled');
  }

  if (booked.status === 'finished') {
    throw new Error('Booking has already been completed');
  }

  const startedBooking = await prisma.$transaction(async transactionClient => {
    await transactionClient.payment.update({
      where: {
        id: bookingId,
      },
      data: {
        paymentStatus: 'paid',
        paymentDate: new Date().toISOString(),
      },
    });

    const bookingToStart = await transactionClient.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: 'started',
      },
    });

    if (!bookingToStart) {
      await transactionClient.payment.update({
        where: {
          id: bookingId,
        },
        data: {
          paymentStatus: 'refund',
        },
      });
    }

    return bookingToStart;
  });

  return startedBooking;
};

const finishBooking = async (bookingId: string): Promise<any> => {
  const finishedBooking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!finishedBooking) {
    throw new Error('Appointment does not exist');
  }

  if (finishedBooking.status === 'cancelled') {
    throw new Error('Appointment has already been cancelled');
  }

  if (finishedBooking.status === 'finished') {
    throw new Error('Appointment has already been completed');
  }

  const bookingToFinished = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: 'finished',
    },
  });

  return bookingToFinished;
};

const getAllBooking = async (
  filters: IBookingFiltersRequest,
  options: IPaginationOptions
): Promise<any> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: BookingFilterableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: {
          equals: value,
        },
      })),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
    where: whereConditions,
    include: {
      availableService: true,
      payments: true,
      users: true,
    },

    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.booking.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getBooking = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
  });

  return result;
};
const updateBooking = async (
  id: string,
  booking: Partial<Booking>
): Promise<Booking | null> => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: booking,
  });

  return result;
};

const deleteBooking = async (id: string): Promise<Booking> => {
  const result = await prisma.booking.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const BookingService = {
  createBooking,
  cancelBooking,
  startBooking,
  finishBooking,
  getAllBooking,
  getBooking,
  updateBooking,
  deleteBooking,
};
