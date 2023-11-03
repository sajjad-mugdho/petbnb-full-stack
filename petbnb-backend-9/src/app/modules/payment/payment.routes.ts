import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.post(
  '/create-payment',
  auth(ENUM_USER_ROLE.USER),
  PaymentController.createPayment
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.HOST,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  PaymentController.getAllPayments
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.HOST,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  PaymentController.getSinglePayment
);
router.patch(
  '/:id',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.HOST,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  PaymentController.updatePayment
);
router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.HOST,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  PaymentController.deletePayment
);

export const PaymentRoutes = router;
