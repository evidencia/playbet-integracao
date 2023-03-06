import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.API_URL,
});

export const ticTacToeApi = axios.create({
  baseURL: import.meta.env.TTT_API_URL,
});
