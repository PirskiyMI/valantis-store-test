import { FC } from 'react';
import { IProduct } from '../../../types/product';
import styles from './styles.module.css';

export const ProductItem: FC<{ product: IProduct }> = ({
   product: { id, product, price, brand },
}) => {
   return (
      <div className={styles.item}>
         <p className={styles.item__param}>{id}</p>
         <p className={styles.item__param}>Продукт: {product}</p>
         <p className={styles.item__param}>Бренд: {brand ? brand : '-'}</p>
         <p className={styles.item__param}>Цена: {price}</p>
      </div>
   );
};
