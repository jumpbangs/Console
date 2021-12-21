import React from 'react';

/**
 * Custom hook useToggle
 */
export default function useToggle(initialValue: boolean = false) {
  const [value, setValue] = React.useState(initialValue);

  const toggle = React.useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle] as const;
}
