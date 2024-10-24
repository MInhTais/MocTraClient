import axios from "axios";
import {DOMAIN} from '../Common/API/domain';
import {REFRESH_TOKEN_API_URL} from '../Common/API/AuthAPI';
import {notify} from '../libs/Notify/Notify';
import * as MESSAGE from '../Common/Const/Notify/NotifyConst';
import { history } from "../libs/History/history";
 const getLocalAccessToken=() =>{
    const accessToken = JSON.parse(localStorage.getItem("credentials"))?.accesstoken;
    return accessToken;
  }
  
  const getLocalRefreshToken=()=> {
    const refreshToken = JSON.parse(localStorage.getItem("credentials"))?.refreshtoken;
    return refreshToken;
  }
  
  const instance = axios.create({
    baseURL: DOMAIN,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  instance.interceptors.response.use(
    (res) => {
        console.log("RESPONSE",res)
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
    console.log("Error", err);
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
  
          try {
            const rs = await refreshToken();
            const { accessToken } = rs.data;
            let credentials = JSON.parse(localStorage.getItem('credentials'));
            credentials.accesstoken = accessToken;
            localStorage.setItem("credentials", JSON.stringify(credentials));
            instance.defaults.headers.common["Authorization"] = accessToken;
  
            return instance(originalConfig);
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
  
            return Promise.reject(_error);
          }
        }
  
        if (err.response.status === 403 && err.response.data) {
          notify('error',MESSAGE.LOGIN_AGAIN);
          localStorage.removeItem('credentials');
          history.replace('/trang-chu');
          return Promise.reject(err.response.data);
        }
      }
  
      return Promise.reject(err);
    }
  );

  const refreshToken=()=> {
    return instance.post(REFRESH_TOKEN_API_URL, {
      refreshToken: getLocalRefreshToken(),
    });
  }
  
  export default instance;