import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://playbet-backend-production.up.railway.app',
});

