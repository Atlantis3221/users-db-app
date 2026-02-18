import axios from 'axios';

const MOCKAPI_BASE = 'https://699441e5fade7a9ec0f4cc68.mockapi.io';

export const api = axios.create({
  baseURL: MOCKAPI_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});
