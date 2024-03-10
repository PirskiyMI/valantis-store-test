import { FC, memo } from 'react';
import { Button } from '../controls/button';
import styles from './styles.module.css';

interface IProps {
   buttons: { title: string; onClick: () => void; disabled: boolean }[];
}

export const Pagination: FC<IProps> = memo(({ buttons }) => {
   return (
      <div className={styles.pagination}>
         {buttons.map(({ title, onClick, disabled }) => (
            <Button key={title} onClick={onClick} disabled={disabled}>
               {title}
            </Button>
         ))}
      </div>
   );
});
