import { Dispatch, SetStateAction, useState } from 'react';
import { Todo } from '../types/types';
import { updateTodos } from '../api/todos';
import { ErrorMessages } from '../types/enums';

export const useUpdateTodos = (
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setCurrentError: Dispatch<SetStateAction<ErrorMessages | ''>>,
  setIsLoadingTodos: Dispatch<SetStateAction<boolean>>,
) => {
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<number[]>([]);

  const handleCheckTodo = async (todoId: number) => {
    setIsLoadingUpdate(prev => [...prev, todoId]);
    try {
      const todoToUpdate = todos.find(todo => todo.id === todoId);

      if (!todoToUpdate) {
        return;
      }

      const data = { ...todoToUpdate, completed: !todoToUpdate.completed };

      await updateTodos(data, todoId);
      setTodos(prev =>
        prev.map(todo =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    } catch (error) {
      setCurrentError(ErrorMessages.Update);
    } finally {
      setIsLoadingUpdate(prev => prev.filter(id => id !== todoId));
    }
  };

  const handleToggleAll = async () => {
    setIsLoadingTodos(true);

    try {
      const allCompleted = todos.every(todo => todo.completed);

      await Promise.all(
        todos
          .filter(todo => todo.completed === allCompleted)
          .map(todo => handleCheckTodo(todo.id)),
      );
    } catch (error) {
      setCurrentError(ErrorMessages.Update);
    } finally {
      setIsLoadingTodos(false);
    }
  };

  return {
    isLoadingUpdate,
    handleCheckTodo,
    handleToggleAll,
  };
};
