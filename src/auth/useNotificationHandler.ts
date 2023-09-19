import {useQueryClient} from '@tanstack/react-query';
import {CB_NOTIFICATION, NotificationData} from '../types';

export const useNotificationHandler = () => {
  const qc = useQueryClient();
  const handler = (data?: NotificationData) => {
    console.log('data', data);
    switch (data?.name) {
      case CB_NOTIFICATION.NEW_BOOKING:
        qc.removeQueries(['APPOINTMENTS', data.doctorId, Number(data.date)]);
        return;
    }
  };

  return handler;
};
