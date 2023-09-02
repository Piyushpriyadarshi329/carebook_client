import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {GET_LEAVE_URL, LEAVE} from '../../../API_CONFIG';
import {DataResponse, GetLeaveRequest, LeaveDto} from '../../../types';
import {useAlert} from '../../../utils/useShowAlert';
import {ADD_LEAVE_URL} from '../../../API_CONFIG';
import {AddLeaveRequest} from '../../../types';

export const useRemoveLeave = (props?: {onSuccess?: any}) => {
  const {axiosAlert} = useAlert();
  const qc = useQueryClient();
  return useMutation((id: string) => axios.delete(`${LEAVE}/${id}`), {
    onSuccess: () => {
      qc.invalidateQueries(['LEAVES']);
      props?.onSuccess();
    },
    onError: axiosAlert,
  });
};

export function useGetLeaves(payload: GetLeaveRequest) {
  return useQuery(
    ['LEAVES', payload],
    () => axios.post<DataResponse<LeaveDto[]>>(GET_LEAVE_URL, payload),
    {
      select: data => data.data.data,
    },
  );
}

export function useAddLeave(onSuccess: any) {
  const qc = useQueryClient();
  const {axiosAlert} = useAlert();
  return useMutation(
    (payload: AddLeaveRequest) => axios.post(ADD_LEAVE_URL, payload),
    {
      onSuccess: () => {
        qc.invalidateQueries(['LEAVES']);
        onSuccess();
      },
      onError: e => {
        axiosAlert(e);
      },
    },
  );
}
