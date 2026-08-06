import prisma from '../config/database';
import { StorageService } from './storage.service';

export class ScanService {
  static async createScan(visitId: string, photos: any[]) {
    const photoRecords = await Promise.all(
      photos.map(async (p) => {
        const storageKey = await StorageService.uploadBase64Image(p.dataUrl, `${p.positionId}.png`);
        return {
          positionId: p.positionId,
          storageKey,
        };
      })
    );

    const scan = await prisma.scan.create({
      data: {
        visitId,
        photos: {
          create: photoRecords,
        },
      },
      include: {
        photos: true,
      },
    });

    await prisma.diagnosisResult.create({
      data: {
        scanId: scan.id,
        globalOpi: 1.82,
        accuracy: 92,
        severity: 'Moderate',
        toothScores: {
          create: [
            { positionCode: 'A1', toothNumber: '17-14', name: 'Top Left', opiScore: 1.1, severity: 'low' },
            { positionCode: 'A2', toothNumber: '13-23', name: 'Top Middle', opiScore: 0.9, severity: 'low' },
            { positionCode: 'A3', toothNumber: '24-27', name: 'Top Right', opiScore: 1.3, severity: 'low' },
            { positionCode: 'B1', toothNumber: '13-11', name: 'Central Left', opiScore: 1.8, severity: 'moderate' },
            { positionCode: 'B2', toothNumber: '11-21', name: 'Central Middle', opiScore: 2.1, severity: 'moderate' },
            { positionCode: 'B3', toothNumber: '21-23', name: 'Central Right', opiScore: 1.7, severity: 'moderate' },
            { positionCode: 'C1', toothNumber: '47-44', name: 'Bottom Left', opiScore: 2.6, severity: 'high' },
            { positionCode: 'C2', toothNumber: '43-33', name: 'Bottom Middle', opiScore: 2.9, severity: 'high' },
            { positionCode: 'C3', toothNumber: '34-37', name: 'Bottom Right', opiScore: 2.4, severity: 'high' },
          ]
        },
        treatments: {
          create: [
            { title: 'Improved Brushing Technique', detail: 'Focus on the gum line at a 45-degree angle.', order: 1 },
            { title: 'Interdental Cleaning', detail: 'Start using floss or interdental brushes daily.', order: 2 },
            { title: 'Professional Cleaning', detail: 'Schedule a scaling and polishing session.', order: 3 },
            { title: 'Fluoride Application', detail: 'Use a high-fluoride toothpaste for sensitive areas.', order: 4 },
          ]
        }
      }
    });

    return scan;
  }

  static async getScanResults(scanId: number) {
    return prisma.diagnosisResult.findUnique({
      where: { scanId },
      include: {
        toothScores: true,
        treatments: {
          orderBy: { order: 'asc' }
        }
      }
    });
  }
}
