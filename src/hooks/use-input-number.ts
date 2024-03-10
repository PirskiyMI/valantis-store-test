import { useState, ChangeEvent } from 'react';

export const useInputNumber = () => {
   const [value, setValue] = useState<string>('');

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isNaN(+e.target.value)) {
         setValue(e.target.value);
      }
   };

   return { value, onChange };
};
