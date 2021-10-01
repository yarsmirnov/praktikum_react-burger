import moment from 'moment';
import 'moment/locale/ru';

export const formatDate = (dateString: string): string => {
  moment.locale('ru');
  const timezone = 'i-GMT+3'

  return `${moment(dateString).calendar()} ${timezone}`;
};
