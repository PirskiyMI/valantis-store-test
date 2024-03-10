import { FC } from 'react';
import styles from './styles.module.css';

export const ProductNotFound: FC = () => {
   return (
      <div className={styles.body}>
         <h2 className={styles.body__title}>Ничего не найдено</h2>
         <p className={styles.body__subtitle}>по данному запросу</p>
      </div>
   );
};
