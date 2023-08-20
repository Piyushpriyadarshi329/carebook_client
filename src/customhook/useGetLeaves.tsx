import axios from 'axios';
import {GETLEAVE_URL} from '../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {DataResponse, LeaveDto} from '../types';

export function useGetLeaves(payload: any) {
  return useQuery(
    ['LEAVES', payload],
    () => axios.post<DataResponse<LeaveDto[]>>(GETLEAVE_URL, payload),
    {
      select: data => {
        let date = new Date();
        let currentdate = date.setDate(date.getDate() - 1);

        console.log('currentdate', currentdate);

        // [{"active": 1, "created_datetime": "1691519499248", "doctor_id": "39f778b5-b1f7-42c6-b34c-f649b1af23f9", "fromdate": "1691798400000", "fullday": 1, "id": "5440cce8-07f7-4044-9198-c9ff32e29899", "reason": "Test ", "todate": "1691798400000", "worktime_id": ""}, {"active": 1, "created_datetime": "1691518314369", "doctor_id": "39f778b5-b1f7-42c6-b34c-f649b1af23f9", "fromdate": "1691625600000", "fullday": 1, "id": "8c90e29b-4648-4dbc-a8e2-218ec1935dac", "reason": "Test ", "todate": "1691625600000", "worktime_id": ""}]

        let filterleaves = data.data.data?.filter(
          i => Number(i.todate) > currentdate,
        );
        return filterleaves;
      },
    },
  );
}
