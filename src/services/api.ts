import { CapturedPhoto, PatientInfo } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function saveScan(patient: PatientInfo, photos: CapturedPhoto[]) {
  try {
    const response = await fetch(`${API_URL}/api/scans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient,
        photos,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save scan');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getInstructions() {
  try {
    const response = await fetch(`${API_URL}/api/instructions`);
    if (!response.ok) {
      throw new Error('Failed to fetch instructions');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getScanResults(scanId: number) {
  try {
    const response = await fetch(`${API_URL}/api/scans/${scanId}/results`);
    if (!response.ok) {
      throw new Error('Failed to fetch scan results');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getBackendInfo() {
  try {
    const response = await fetch(`${API_URL}/api/info`);
    if (!response.ok) {
      throw new Error('Failed to fetch backend info');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
