import { FC, memo } from 'react';
import { IProduct } from '../../types/product';
import styles from './styles.module.css';
import { ProductItem } from './item';

export const ProductList: FC<{ products: IProduct[] }> = memo(({ products }) => {
   return (
      <ul className={styles.list}>
         {products.map((product) => (
            <li key={product.id} className={styles.list__item}>
               <ProductItem product={product} />
            </li>
         ))}
      </ul>
   );
});
