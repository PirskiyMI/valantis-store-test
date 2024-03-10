import md5 from 'md5';
import { password } from '../constants/password';

export const getAuthKey = () => {
   const now = new Date();
   const timestamp = now.toISOString().slice(0, 10).replace(/-/g, '');
   return md5(`${password}_${timestamp}`);
};
