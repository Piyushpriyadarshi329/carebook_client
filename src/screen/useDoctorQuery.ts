import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {GETDOCTORLIST_URL, GET_DOCTOR, UPDATE_DOCTOR} from '../API_CONFIG';
import {DoctorDto, GetDoctorsListResponse, UpdateDoctorRequest} from '../types';

export const useGetDoctorsList = (clinic_id: string) => {
  return useQuery(
    ['DOCTORS'],
    () => axios.post<GetDoctorsListResponse>(GETDOCTORLIST_URL, {clinic_id}),
    {
      select: data => data.data,
    },
  );
};

export const useGetDoctor = (
  id: string,
  onSuccess?: (p?: DoctorDto[]) => void,
) => {
  return useQuery(
    ['DOCTOR', id],
    () => axios.post<GetDoctorsListResponse>(GET_DOCTOR, {id}),
    {
      select: data => data.data.data,
      onSuccess: onSuccess,
    },
  );
};

export const useMutateDoctorProfile = (doctor_id: string, onSuccess?: any) => {
  const qc = useQueryClient();
  return useMutation(
    (payload: UpdateDoctorRequest) =>
      axios.post(`${UPDATE_DOCTOR}/${doctor_id}`, payload),
    {
      onSuccess: () => {
        qc.invalidateQueries(['DOCTOR', doctor_id]);
        onSuccess?.();
      },
    },
  );
};
