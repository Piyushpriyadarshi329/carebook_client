import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {
  ADDDOCTOR_URL,
  GETDOCTORLIST_URL,
  GET_DOCTOR,
  LINK_DOCTOR_URL,
  UPDATE_DOCTOR,
} from '../API_CONFIG';
import {
  AddDoctorRequest,
  AddDoctorResponse,
  DoctorDto,
  GetDoctorsListResponse,
  GetDotcorsListRequest,
  LinkDoctorRequest,
  UpdateDoctorRequest,
} from '../types';
import {useAlert} from '../utils/useShowAlert';
import {texts} from '../asset/constants';

export const useGetDoctorsList = (
  payload: GetDotcorsListRequest,
  enabled?: boolean,
) => {
  return useQuery(
    ['DOCTORS', payload],
    () => axios.post<GetDoctorsListResponse>(GETDOCTORLIST_URL, payload),
    {
      select: data => data.data.data,
      enabled: enabled,
    },
  );
};

export const useGetDoctor = (
  id: string,
  onSuccess?: (p?: DoctorDto[]) => void,
) => {
  const {axiosAlert} = useAlert();
  return useQuery(
    ['DOCTOR', id],
    () => axios.post<GetDoctorsListResponse>(GET_DOCTOR, {id}),
    {
      select: data => data.data.data,
      onSuccess: onSuccess,
      onError: e => {
        axiosAlert(e);
      },
    },
  );
};

export const useMutateDoctorProfile = (doctor_id: string, onSuccess?: any) => {
  const {axiosAlert} = useAlert();
  const qc = useQueryClient();
  return useMutation(
    (payload: UpdateDoctorRequest) =>
      axios.post(`${UPDATE_DOCTOR}/${doctor_id}`, payload),
    {
      onSuccess: () => {
        qc.invalidateQueries(['DOCTOR', doctor_id]);
        onSuccess?.();
      },
      onError: (e, v, c) => {
        console.error(v);
        axiosAlert(e);
      },
    },
  );
};

export const useLinkDoctorMutation = (onSuccess: any) => {
  const {axiosAlert} = useAlert();
  const qc = useQueryClient();
  return useMutation(
    (payload: LinkDoctorRequest) => axios.post(LINK_DOCTOR_URL, payload),
    {
      onSuccess: () => {
        qc.invalidateQueries(['DOCTORS']);
        onSuccess();
      },
      onError: e => {
        axiosAlert(e);
      },
    },
  );
};

export const useAddDoctor = ({onSuccess}: {onSuccess: () => void}) => {
  const {axiosAlert} = useAlert();
  const qc = useQueryClient();
  return useMutation(
    (payload: AddDoctorRequest) => {
      return axios.post<AddDoctorResponse>(ADDDOCTOR_URL, payload);
    },
    {
      onSuccess: () => {
        qc.invalidateQueries(['DOCTORS']);
        onSuccess();
      },
      onError: (e: any) => {
        axiosAlert(e);
      },
    },
  );
};
