import Request from './http.reqeuest';

export const axios = new Request(import.meta.env.DEV ? '/api' : import.meta.env.VITE_BASE_URL);
