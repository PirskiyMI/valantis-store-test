import { useCallback, useState } from 'react';

export const usePagination = () => {
   const [isFetching, setIsFetching] = useState<boolean>(true);
   const [page, setPage] = useState<number>(1);
   const [pageCount, setPageCount] = useState<number>(0);

   const toNextPage = useCallback(() => {
      setPage((prev) => (prev += 1));

      if (page > pageCount) {
         setIsFetching(true);
         setPageCount((prev) => (prev += 1));
      }
   }, [page, pageCount]);
   const toPrevPage = useCallback(() => {
      setPage((prev) => (prev -= 1));
   }, []);

   return {
      page,
      pageCount,
      setPage,
      setPageCount,
      isFetching,
      setIsFetching,
      toNextPage,
      toPrevPage,
   };
};
