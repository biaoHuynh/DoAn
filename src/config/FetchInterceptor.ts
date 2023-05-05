import axios from 'axios';
import history from './history';
import { notification } from 'antd';
import { notificationController } from '@app/controllers/notificationController';

const service = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: 'http://149.51.37.29:8080',
  timeout: 60000,
});

// Config
const ENTRY_ROUTE = '/noauth';
const TOKEN_PAYLOAD_KEY = 'Authorization';
const PUBLIC_REQUEST_KEY = 'public-request';
const AUTH_TOKEN = 'AccessToken';

const notificationParam: any = {
  message: 'Authentication Fail',
};

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';

    const jwtToken = localStorage.getItem(AUTH_TOKEN);
    if (jwtToken) {
      // config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + jwtToken;
      config.headers[TOKEN_PAYLOAD_KEY] = jwtToken;
      // config.headers[TOKEN_PAYLOAD_KEY] = "C0iDGQOe23HC1rg2ra4CCCC";
    }

    const temp: any = config.url?.split('/');
    if (temp[temp?.length - 1] != 'login') {
      if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
        console.log('vao');
        history.push(ENTRY_ROUTE);
        //window.location.reload();
      }
    }

    return config;
  },
  (error) => {
    // Do something with request error here
    notification.error({
      message: 'Error',
    });
    Promise.reject(error);
  },
);

// API respone interceptor
service.interceptors.response.use(
  (response) => {
    if (response.data?.success) notificationParam.message = response.data?.success;

    // notification.success(notificationParam);
    return response.data;
  },
  (error) => {
    console.log(333);

    // Remove token and redirect
    if (error.response) {
      if (error.response.status === 400 || error.response.status === 403) {
        if (error.response.data?.success) notificationParam.message = error.response.data?.success;

        const originalConfig = error.config;
        if (originalConfig.url === '/accounts/sign-in') {
          notificationParam.description = 'Please login again';
          localStorage.removeItem(AUTH_TOKEN);
          history.push(ENTRY_ROUTE);
        } else {
          //window.location.reload();
        }
      }
      console.log(11222);

      if (error.response.status === 401) {
        history.push(ENTRY_ROUTE);
        window.location.reload();
      }

      if (error.response.status === 404) {
        notificationParam.message = 'Not Found';
      }

      if (error.response.status === 405) {
        notificationParam.message = 'Method Not Allowed';
      }

      if (error.response.status === 500) {
        notificationParam.message = 'Internal Server Error';
      }

      if (error.response.status === 508) {
        notificationParam.message = 'Time Out';
      }
    } else {
      notificationParam.message = 'Error';
    }

    notificationController.error({ message: notificationParam.message });

    return Promise.reject(error);
  },
);

export default service;
