import express from 'express';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post('/book-appointment', BookingController.createBooking);
router.patch('/cancel-appointment/:id', BookingController.cancelBooking);
router.patch('/start-appointment/:id', BookingController.startBooking);
router.patch('/finish-appointment/:id', BookingController.finishBooking);
router.get('/', BookingController.getAllBooking);
router.get('/:id', BookingController.getBooking);
router.patch('/:id', BookingController.updateBooking);
router.delete('/:id', BookingController.deleteBooking);

export const BookingRouter = router;
