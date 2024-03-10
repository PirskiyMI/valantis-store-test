import axios from 'axios';
import { IProduct } from '../types/product';
import { getAuthKey } from '../helpers/get-auth-key';
import { API_URL } from '../constants/api';

export default class ProductService {
   static async getProducts(ids: string[]): Promise<IProduct[] | undefined> {
      try {
         const response: IProduct[] = await axios
            .post<{ result: IProduct[] }>(
               API_URL,
               {
                  action: 'get_items',
                  params: { ids },
               },
               {
                  headers: {
                     'X-Auth': getAuthKey(),
                  },
               },
            )
            .then((res) => {
               const array = res.data.result.reduce((init, acc) => {
                  if (init.find((el) => el.id === acc.id)) return init;
                  init.push(acc);
                  return init;
               }, [] as IProduct[]);
               return array;
            });
         return response;
      } catch (error) {
         console.log(error);
         return await this.getProducts(ids);
      }
   }
}
