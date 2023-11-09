import express from 'express';
import { AvailableHostController } from './availableHost.controller';

const router = express.Router();
router.post('/', AvailableHostController.getAllAvailableHosts);
router.post('/:id', AvailableHostController.getAvailableHost);
router.post('/create', AvailableHostController.createHost);
router.patch('/:id', AvailableHostController.updateAvailableHost);
router.delete('/:id', AvailableHostController.deleteAvailableHost);
export const AvailableHostRoutes = router;
