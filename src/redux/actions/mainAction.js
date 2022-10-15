import { message } from 'antd';
import axios from 'axios';

export function getPriority() {
  return {
    type: 'GET_PRIORITY',
    payload: axios('https://demo.digitool.agency/demoapi/getPriority')
      .then((response) => {
        const { resultSet } = response.data;
        return resultSet;
      })
      .catch(() => {
        message.error('Network Error');
        return [];
      })
  };
}
