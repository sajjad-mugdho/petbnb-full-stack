import express from 'express';
import { ProfileController } from './profile.controller';

const router = express.Router();
router.get('/', ProfileController.getAllProfiles);
router.get('/:id', ProfileController.getSingleprofile);
router.get('/:id', ProfileController.updateprofile);
router.get('/:id', ProfileController.deleteProfile);
export const ProfileRoutes = router;
