import { RefObject, useEffect } from 'react';

export const useInputFocus = (loadings: (boolean | number[])[], inputRef:RefObject<HTMLInputElement>) => {

  useEffect(() => {
    const [isLoadingTodos, isLoadingAdd, isLoadingDelete, isLoadingUpdate] =
      loadings;

    if (
      !isLoadingTodos &&
      !isLoadingAdd &&
      (Array.isArray(isLoadingDelete) ? isLoadingDelete.length === 0 : true) &&
      (Array.isArray(isLoadingUpdate) ? isLoadingUpdate.length === 0 : true) &&
      inputRef.current
    ) {
      inputRef.current.focus();
    }
  }, loadings);

  return inputRef;
};
