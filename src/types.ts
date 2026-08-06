export type ScreenStep = 'instructions' | 'camera' | 'review' | 'processing' | 'results';

export interface DentalPosition {
  id: string; // e.g. 'A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'
  code: string; // e.g. 'A1'
  label: string; // e.g. 'Top Right'
  fullTitle: string; // e.g. 'A1: Top Right'
  defaultImage: string;
}

export interface CapturedPhoto {
  positionId: string;
  dataUrl: string; // captured canvas image data or default url
  timestamp: number;
}

export interface PatientInfo {
  name: string;
  id: string;
  visitNumber: string;
  date: string;
}
