import express from 'express';
import { BookingController } from './booking.controller';

const router = express.Router();
router.post('/create-booking', BookingController.createBooking);
export const BookingRouter = router;
