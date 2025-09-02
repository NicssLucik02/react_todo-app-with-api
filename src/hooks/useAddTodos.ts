import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { Todo } from '../types/types';
import { ErrorMessages } from '../types/enums';
import { addTodos } from '../api/todos';

export const useAddTodos = (
  setCurrentError: Dispatch<SetStateAction<ErrorMessages | ''>>,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  inputRef: RefObject<HTMLInputElement>,
) => {
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

  const handleAddTodo = async (
    title: string,
    setSearchQuery: (value: string) => void,
  ) => {
    const newTodo: Todo = {
      id: 0,
      userId: 3349,
      title: title.trim(),
      completed: false,
    };

    if (title.trim() === '') {
      setCurrentError(ErrorMessages.EmptyTitle);

      return;
    }

    setIsLoadingAdd(true);
    setTempTodo(newTodo);
    try {
      const result = await addTodos(newTodo);

      setTodos(prev => [...prev, result]);

      setTempTodo(null);
      setSearchQuery('');
    } catch (error) {
      setCurrentError(ErrorMessages.Add);
      setTempTodo(null);
    } finally {
      setIsLoadingAdd(false);
      if (inputRef.current && !inputRef.current.disabled) {
        inputRef.current.focus();
      }
    }
  };

  return { isLoadingAdd, tempTodo, handleAddTodo, setTempTodo };
};
