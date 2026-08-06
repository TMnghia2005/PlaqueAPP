import { Request, Response } from 'express';
import { PatientService } from '../services/patient.service';

export class PatientController {
  static async list(req: Request, res: Response) {
    const patients = await PatientService.getAllPatients();
    res.json(patients);
  }

  static async detail(req: Request, res: Response) {
    const patient = await PatientService.getPatientById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  }

  static async upsert(req: Request, res: Response) {
    const patient = await PatientService.upsertPatient(req.body);
    res.json(patient);
  }

  static async createVisit(req: Request, res: Response) {
    const visit = await PatientService.createVisit(req.params.id, req.body.date, req.body.notes);
    res.status(201).json(visit);
  }
}
