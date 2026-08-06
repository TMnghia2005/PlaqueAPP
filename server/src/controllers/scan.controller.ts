import { Request, Response } from 'express';
import { ScanService } from '../services/scan.service';
import prisma from '../config/database';

export class ScanController {
  static async create(req: Request, res: Response) {
    try {
      const { visitId, photos } = req.body;
      const scan = await ScanService.createScan(visitId, photos);
      res.status(201).json(scan);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create scan' });
    }
  }

  static async results(req: Request, res: Response) {
    const results = await ScanService.getScanResults(parseInt(req.params.id));
    if (!results) return res.status(404).json({ error: 'Results not found' });
    res.json(results);
  }

  static async instructions(req: Request, res: Response) {
    const instructions = await prisma.instruction.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(instructions);
  }

  static async info(req: Request, res: Response) {
    const patientCount = await prisma.patient.count();
    res.json({
      status: 'running',
      database: 'connected',
      patientCount,
      timestamp: new Date().toISOString(),
    });
  }
}
