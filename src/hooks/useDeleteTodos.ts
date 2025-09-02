import { useState } from 'react';
import { deleteTodos } from '../api/todos';
import { ErrorMessages } from '../types/enums';
import { Todo } from '../types/types';

export const useDeleteTodos = (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setCurrentError: (error: ErrorMessages | '') => void,
) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState<number[]>([]);

  const handleDeleteTodos = async (todoId: number) => {
    setIsLoadingDelete(prev => [...prev, todoId]);
    try {
      await deleteTodos(todoId);
      setTodos(prev => prev.filter(todo => todo.id !== todoId));
    } catch (error) {
      setCurrentError(ErrorMessages.Delete);
    } finally {
      setIsLoadingDelete(prev => prev.filter(id => id !== todoId));
    }
  };

  const handleDeleteAllTodos = async (todos: Todo[]) => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);

      await Promise.all(completedTodos.map(item => handleDeleteTodos(item.id)));
    } catch (error) {
      setCurrentError(ErrorMessages.Delete);
    }
  };

  return { isLoadingDelete, handleDeleteTodos, handleDeleteAllTodos };
};
