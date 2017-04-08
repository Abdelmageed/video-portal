import axios from 'axios';
import configs from '../../config';
const apiUrl = `http://localhost:${configs.applicationPort}/`;
export const axiosInstance = axios.create({
  baseURL: apiUrl,
  validateStatus: (status)=> {
    return status < 500; // Reject only if the status code is greater than or equal to 500
  }
});
//axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const login = 'user/auth';
export const logout = 'user/logout';
export const videos = 'videos';
export const video = 'video';
export const rating = 'video/ratings';
