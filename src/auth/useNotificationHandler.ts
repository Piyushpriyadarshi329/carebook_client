import {useQueryClient} from '@tanstack/react-query';
import {CB_NOTIFICATION, NotificationData} from '../types';

export const useNotificationHandler = () => {
  const qc = useQueryClient();
  const handler = (data?: NotificationData) => {
    switch (data?.name) {
      case CB_NOTIFICATION.NEW_BOOKING:
        qc.invalidateQueries([
          'APPOINTMENTS',
          data.doctorId,
          Number(data.date),
        ]);
        qc.invalidateQueries(['APPOINTMENTS', data.doctorId, undefined]);
        return;
    }
  };

  return handler;
};
