import { IProduct } from './../types/product';

export const getCurrentProducts = (products: IProduct[], page: number): IProduct[] => {
   const startPosition = 0 + (page - 1) * 50;
   const endPosition = startPosition + 50;
   const currentProductList = products.slice(startPosition, endPosition).filter(Boolean);

   return currentProductList;
};
