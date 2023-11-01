import express from 'express';
import { HostController } from './host.controller';

const router = express.Router();

router.get('/', HostController.getHosts);
router.get('/:id', HostController.getHostById);
router.patch('/:id', HostController.updateHost);
router.delete('/:id', HostController.deleteHost);

export const HostRoutes = router;
