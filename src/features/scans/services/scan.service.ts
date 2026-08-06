import client from '../../../api/client';
import { CapturedPhoto } from '../../../types';

export class ScanService {
  static async getInstructions() {
    const { data } = await client.get('/api/scans/instructions');
    return data;
  }

  static async saveScan(visitId: string, photos: CapturedPhoto[]) {
    const { data } = await client.post('/api/scans', { visitId, photos });
    return data;
  }

  static async getResults(scanId: number) {
    const { data } = await client.get(`/api/scans/${scanId}/results`);
    return data;
  }

  static async getBackendInfo() {
    const { data } = await client.get('/api/info');
    return data;
  }
}
