import prisma from '../config/database';

export class PatientService {
  static async getAllPatients() {
    return prisma.patient.findMany({
      include: { visits: true },
    });
  }

  static async getPatientById(id: string) {
    return prisma.patient.findUnique({
      where: { id },
      include: {
        visits: {
          include: { scans: true }
        }
      },
    });
  }

  static async upsertPatient(data: any) {
    return prisma.patient.upsert({
      where: { id: data.id },
      update: {
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        phone: data.phone,
        notes: data.notes,
      },
      create: {
        id: data.id,
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        phone: data.phone,
        notes: data.notes,
      },
    });
  }

  static async createVisit(patientId: string, date: string, notes?: string) {
    return prisma.visit.create({
      data: {
        patientId,
        date,
        notes,
      },
    });
  }
}
