import axios from 'axios';
import { getAuthKey } from '../helpers/get-auth-key';

export default class IdService {
   static async getIdList(data: { offset: number; limit: number }): Promise<string[] | undefined> {
      const key = getAuthKey();
      try {
         const response = await axios
            .post<{ result: string[] }>(
               'https://api.valantis.store:40000/',
               {
                  action: 'get_ids',
                  params: data,
               },
               {
                  headers: {
                     'X-Auth': key,
                  },
               },
            )
            .then(async (res) => {
               const set = new Set(res.data.result);
               const array = Array.from(set);

               if (array.length === data.limit) return array;

               const limit = 50 - array.length;
               const offset = res.data.result.length;

               const response = await axios
                  .post<{ result: string[] }>(
                     'http://api.valantis.store:40000/',
                     {
                        action: 'get_ids',
                        params: {
                           limit,
                           offset,
                        },
                     },
                     {
                        headers: {
                           'X-Auth': key,
                        },
                     },
                  )
                  .then((res) => res.data.result);

               if (response) {
                  array.push(...response);
                  return array;
               }
            });

         return response;
      } catch (error) {
         console.log(error);
         return await this.getIdList(data);
      }
   }

   static async getIdFilteredList(
      data: { limit: number; offset: number },
      params: {
         product?: string;
         brand?: string | null;
         price?: number;
      },
   ): Promise<{ idList: string[]; pageCount: number } | undefined> {
      try {
         const response = await axios
            .post<{ result: string[] }>(
               'https://api.valantis.store:40000/',
               {
                  action: 'filter',
                  params,
               },
               {
                  headers: {
                     'X-Auth': getAuthKey(),
                  },
               },
            )
            .then((res) => {
               const idList = res.data.result;
               const pageCount = Math.ceil(idList.length / data.limit);
               return { idList, pageCount };
            });
         return response;
      } catch (error) {
         console.log(error);
         return await this.getIdFilteredList(data, params);
      }
   }
}
