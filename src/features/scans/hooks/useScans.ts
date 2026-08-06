import { useQuery, useMutation } from '@tanstack/react-query';
import { ScanService } from '../services/scan.service';
import { CapturedPhoto } from '../../../types';

export const useInstructions = () => {
  return useQuery({
    queryKey: ['instructions'],
    queryFn: ScanService.getInstructions,
  });
};

export const useSaveScan = () => {
  return useMutation({
    mutationFn: ({ visitId, photos }: { visitId: string; photos: CapturedPhoto[] }) =>
      ScanService.saveScan(visitId, photos),
  });
};

export const useScanResults = (scanId?: number) => {
  return useQuery({
    queryKey: ['scanResults', scanId],
    queryFn: () => ScanService.getResults(scanId!),
    enabled: !!scanId,
  });
};
