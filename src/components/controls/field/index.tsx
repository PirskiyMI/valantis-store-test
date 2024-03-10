import { FC, InputHTMLAttributes, memo } from 'react';
import styles from './styles.module.css';

export const Field: FC<InputHTMLAttributes<HTMLInputElement>> = memo((props) => {
   return <input {...props} className={styles.field} />;
});
