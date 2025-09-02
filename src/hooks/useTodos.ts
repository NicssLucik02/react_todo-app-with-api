import { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/types';
import { getTodos } from '../api/todos';
import { ErrorMessages } from '../types/enums';
import { useErrorReset } from './useErrorReset';
import { useInputFocus } from './useInputFocus';
import { useDeleteTodos } from './useDeleteTodos';
import { useEditTodos } from './useEditTodos';
import { useAddTodos } from './useAddTodos';
import { useUpdateTodos } from './useUpdateTodos';

export const useTodos = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);
  const { currentError, setCurrentError } = useErrorReset();
  const { isLoadingDelete, handleDeleteTodos, handleDeleteAllTodos } =
    useDeleteTodos(setTodos, setCurrentError);
  const {
    isLoadingEdit,
    handleEditTodo,
    editTodoQuery,
    handleEditTodoQuery,
    defaultEditInputValue,
    handleActivateEdit,
    activeEdit,
    setActiveEdit,
    setEditTodoQuery,
  } = useEditTodos(handleDeleteTodos, setTodos, setCurrentError, todos);
  const { isLoadingAdd, tempTodo, handleAddTodo, setTempTodo } = useAddTodos(
    setCurrentError,
    setTodos,
    inputRef,
  );
  const { isLoadingUpdate, handleCheckTodo, handleToggleAll } = useUpdateTodos(
    todos,
    setTodos,
    setCurrentError,
    setIsLoadingTodos,
  );

  useInputFocus([
    isLoadingTodos,
    isLoadingAdd,
    isLoadingDelete,
    isLoadingUpdate,
  ], inputRef);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoadingTodos(true);
        const data: Todo[] = await getTodos();

        setTodos(data);
      } catch (error) {
        setCurrentError(ErrorMessages.Load);
      } finally {
        setIsLoadingTodos(false);
      }
    };

    loadTodos();
  }, []);

  return {
    todos,
    isLoadingTodos,
    isLoadingAdd,
    isLoadingDelete,
    isLoadingUpdate,
    isLoadingEdit,
    setCurrentError,
    currentError,
    handleAddTodo,
    inputRef,
    tempTodo,
    handleDeleteTodos,
    handleDeleteAllTodos,
    setTempTodo,
    handleCheckTodo,
    handleToggleAll,
    handleEditTodo,
    editTodoQuery,
    handleEditTodoQuery,
    defaultEditInputValue,
    handleActivateEdit,
    activeEdit,
    setActiveEdit,
    setEditTodoQuery,
  };
};
