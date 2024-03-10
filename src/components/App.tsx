import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

import IdService from '../api/IdService';
import ProductService from '../api/ProductsService';

import { useInputNumber } from '../hooks/use-input-number';
import { useInput } from '../hooks/use-input';
import { usePagination } from '../hooks/use-pagination';

import { getCurrentProducts } from '../helpers/get-current-products';

import { IProduct } from '../types/product';

import { Pagination } from './pagination';
import { Preloader } from './preloader';
import { ProductList } from './product-list';
import { ProductNotFound } from './product-not-found';
import { SearchForm } from './search-form';

import '../styles/index.css';

export const App = () => {
   const {
      page,
      setPage,
      pageCount,
      setPageCount,
      isFetching,
      setIsFetching,
      toNextPage,
      toPrevPage,
   } = usePagination();
   const [productList, setProductList] = useState<IProduct[]>([]);
   const price = useInputNumber();
   const brand = useInput('');
   const product = useInput('');

   const fieldList = useMemo(
      () => [
         { id: '1', placeholder: 'Поиск по названию', ...product },
         { id: '2', placeholder: 'Поиск по бренду', ...brand },
         { id: '3', placeholder: 'Поисе по цене', ...price },
      ],
      [brand, price, product],
   );
   const buttonList = useMemo(
      () => [
         { title: 'Назад', onClick: toPrevPage, disabled: page === 1 },
         {
            title: 'Вперед',
            onClick: toNextPage,
            disabled: (productList.length % 50 !== 0 && page === pageCount) || isFetching,
         },
      ],
      [toPrevPage, page, toNextPage, productList.length, pageCount, isFetching],
   );
   const onSubmit = useCallback(
      (e: FormEvent<HTMLFormElement>) => {
         e.preventDefault();
         setProductList([]);
         setPage(1);
         setPageCount(0);
         setIsFetching(true);
      },
      [setIsFetching, setPage, setPageCount],
   );

   useEffect(() => {
      if (isFetching) {
         if (brand.value || price.value || product.value) {
            const params = { product: product.value, brand: brand.value, price: +price.value };
            const fetchFilteredProducts = async () => {
               try {
                  const fetchedProducts = await IdService.getIdFilteredList(
                     { offset: (page - 1) * 50, limit: 50 },
                     params,
                  ).then(async (res) => {
                     if (res) {
                        setPageCount(res.pageCount);
                        return await ProductService.getProducts(res.idList);
                     }
                  });
                  if (fetchedProducts) setProductList((prev) => [...prev, ...fetchedProducts]);
               } finally {
                  setIsFetching(false);
               }
            };

            fetchFilteredProducts();
         } else {
            const fetchProducts = async () => {
               try {
                  const fetchedProducts = await IdService.getIdList({
                     offset: (page - 1) * 50,
                     limit: 50,
                  }).then(async (res) => {
                     if (res) return await ProductService.getProducts(res);
                  });
                  if (fetchedProducts) setProductList((prev) => [...prev, ...fetchedProducts]);
               } finally {
                  setIsFetching(false);
               }
            };
            fetchProducts();
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isFetching]);

   return (
      <div className="app">
         <aside className="aside">
            <SearchForm fields={fieldList} onSubmit={onSubmit} />
         </aside>
         <main className="main">
            {isFetching ? (
               <div className="preloader">
                  <Preloader />
               </div>
            ) : productList.length === 0 ? (
               <ProductNotFound />
            ) : (
               <ProductList products={getCurrentProducts(productList, page)} />
            )}
            <Pagination buttons={buttonList} />
         </main>
      </div>
   );
};
