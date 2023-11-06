import express from 'express';
import { AvailableHostController } from './availableHost.controller';

const router = express.Router();
router.post('/create', AvailableHostController.createHost);
export const AvailableHostRoutes = router;
