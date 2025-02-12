import { useCallback, useState } from "react";

export const useToggle = (initialValue: boolean = false): [boolean, () => void] => {
  const [state, setValue] = useState<boolean>(initialValue);
  const toggle = useCallback(() => setValue((value) => !value), []);
  return [state, toggle];
}