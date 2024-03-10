import { ChangeEvent, useCallback, useState } from 'react';

export const useInput = (defaultValue: string) => {
   const [value, setValue] = useState<string>(defaultValue);

   const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);

   return { value, onChange };
};
