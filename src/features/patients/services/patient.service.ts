import client from '../../../api/client';

export class PatientService {
  static async getPatient(id: string) {
    const { data } = await client.get(`/api/patients/${id}`);
    return data;
  }

  static async upsertPatient(patient: any) {
    const { data } = await client.post('/api/patients', patient);
    return data;
  }

  static async createVisit(patientId: string, visit: any) {
    const { data } = await client.post(`/api/patients/${patientId}/visits`, visit);
    return data;
  }
}
