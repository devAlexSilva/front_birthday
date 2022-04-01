import axios from 'axios';
import { parseCookies } from 'nookies';

//para chamadas serverSide
export function axiosClient(ctx){

const api = axios.create({
  baseURL: 'http://localhost:4001'
});


const { user } = parseCookies(ctx);
api.defaults.headers.common['Authorization'] = `Bearer ${user}`


return api;
}
