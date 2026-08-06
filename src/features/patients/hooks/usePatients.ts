import { useQuery, useMutation } from '@tanstack/react-query';
import { PatientService } from '../services/patient.service';

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => PatientService.getPatient(id),
    enabled: !!id,
  });
};

export const useCreateVisit = () => {
  return useMutation({
    mutationFn: ({ patientId, visit }: { patientId: string; visit: any }) =>
      PatientService.createVisit(patientId, visit),
  });
};
