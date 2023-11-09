import express from 'express';
import { BookingController } from './booking.controller';

const router = express.Router();
router.post('/create', BookingController.createBooking);
router.patch('/cancel-booking/:id', BookingController.cancelBooking);
export const BookingRouter = router;
