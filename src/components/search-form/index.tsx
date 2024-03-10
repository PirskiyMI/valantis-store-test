import { FC, HTMLAttributes } from 'react';
import { Field } from '../controls/field';
import { Button } from '../controls/button';
import styles from './styles.module.css';

interface IProps extends HTMLAttributes<HTMLFormElement> {
   fields: HTMLAttributes<HTMLInputElement>[];
}

export const SearchForm: FC<IProps> = ({ fields, ...props }) => {
   return (
      <form {...props} className={styles.form}>
         {fields.map((el) => (
            <Field key={el.id} {...el} />
         ))}
         <Button>Поиск</Button>
      </form>
   );
};
