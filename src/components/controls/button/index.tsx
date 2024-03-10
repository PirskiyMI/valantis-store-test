import { FC, HTMLAttributes, ReactNode, memo } from 'react';
import styles from './styles.module.css';

interface Props extends HTMLAttributes<HTMLButtonElement> {
   children?: ReactNode;
   disabled?: boolean;
}

export const Button: FC<Props> = memo(({ children = false, ...props }) => {
   return (
      <button className={styles.button} {...props}>
         {children}
      </button>
   );
});
