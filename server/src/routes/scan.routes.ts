import { Router } from 'express';
import { ScanController } from '../controllers/scan.controller';

const router = Router();

router.get('/info', ScanController.info);
router.get('/instructions', ScanController.instructions);
router.post('/', ScanController.create);
router.get('/:id/results', ScanController.results);

export default router;
