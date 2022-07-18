import axios from 'axios';
import { parseCookies } from 'nookies';

//para chamadas serverSide
export function axiosClient(ctx){

const api = axios.create({
  baseURL: 'https://birthday-web.herokuapp.com',
});


const { user } = parseCookies(ctx);
api.defaults.headers.common['Authorization'] = `Bearer ${user}`


return api;
}
