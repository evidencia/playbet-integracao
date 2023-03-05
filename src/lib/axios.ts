import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const ticTacToeApi = axios.create({
  baseURL: 'http://localhost:8090',
});
