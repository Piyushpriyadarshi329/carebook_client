import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {
  ADD_DOCTOR_URL,
  GET_DOCTOR_LIST_URL,
  GET_DOCTOR,
  LINK_DOCTOR_URL,
  UPDATE_DOCTOR,
} from '../API_CONFIG';
import {
  AddDoctorRequest,
  AddDoctorResponse,
  DoctorDto,
  GetDoctorResponse,
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
    () => axios.post<GetDoctorsListResponse>(GET_DOCTOR_LIST_URL, payload),
    {
      select: data => data.data.data,
      enabled: enabled,
    },
  );
};

export const useGetDoctor = ({
  id,
  onSuccess,
  clinic_id,
}: {
  id: string;
  onSuccess?: (
    p?: DoctorDto & {
      profile_image: string;
    },
  ) => void;
  clinic_id?: string;
}) => {
  const {axiosAlert} = useAlert();
  return useQuery(
    ['DOCTOR', id],
    () => axios.post<GetDoctorResponse>(GET_DOCTOR, {id, clinic_id}),
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
        qc.invalidateQueries(['DOCTORS']);
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

export const useLinkDoctorMutation = (
  onSuccess?: (data: any, vars: LinkDoctorRequest) => void,
) => {
  const {axiosAlert} = useAlert();
  const qc = useQueryClient();
  return useMutation(
    (payload: LinkDoctorRequest) => axios.post(LINK_DOCTOR_URL, payload),
    {
      onSuccess: (data, variables) => {
        qc.invalidateQueries(['DOCTORS']);
        onSuccess?.(data, variables);
      },
      onError: e => {
        axiosAlert(e);
      },
    },
  );
};

export const useAddDoctor = ({
  onSuccess,
}: {
  onSuccess: (doctor?: {id: string}) => void;
}) => {
  const {axiosAlert} = useAlert();
  const qc = useQueryClient();
  return useMutation(
    (payload: AddDoctorRequest) => {
      return axios.post<AddDoctorResponse>(ADD_DOCTOR_URL, payload);
    },
    {
      onSuccess: data => {
        qc.invalidateQueries(['DOCTORS']);
        onSuccess(data.data.data);
      },
      onError: (e: any) => {
        axiosAlert(e);
      },
    },
  );
};
