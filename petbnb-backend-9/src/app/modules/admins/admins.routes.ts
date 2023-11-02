import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AdminController } from './admins.controller';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.SUPER_ADMIN), AdminController.getAdmins);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getAdminById
);
router.post(
  '/create-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.createAdmin
);
router.post(
  '/signin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.createAdmin
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.updateAdmin
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteAdmin
);
export const AdminRoutes = router;
