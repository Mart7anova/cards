import { useCallback, useState } from 'react';

export const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [isToggled, setIsToggled] = useState(initialState);
  const toggle = useCallback(() => setIsToggled(!isToggled), [isToggled]);
  return [isToggled, toggle];
};