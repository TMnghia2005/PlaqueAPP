import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', PatientController.list);
router.get('/:id', PatientController.detail);
router.post('/', PatientController.upsert);
router.post('/:id/visits', PatientController.createVisit);

export default router;
