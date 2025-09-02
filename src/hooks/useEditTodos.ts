import { Dispatch, SetStateAction, useState } from 'react';
import { Todo } from '../types/types';
import { updateTodos } from '../api/todos';
import { ErrorMessages } from '../types/enums';

export const useEditTodos = (
  handleDeleteTodos: (id: number) => Promise<void>,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setCurrentError: (error: ErrorMessages | '') => void,
  todos: Todo[],
) => {
  const [editTodoQuery, setEditTodoQuery] = useState('');
  const [activeEdit, setActiveEdit] = useState<number | null>(null);
  const [isLoadingEdit, setIsLoadingEdit] = useState<number | null>(null);

  const handleEditTodo = async (todoId: number, editTitle: string) => {
    setIsLoadingEdit(todoId);

    try {
      const todoToUpdate = todos.find(todo => todo.id === todoId);

      if (!todoToUpdate) {
        return;
      }

      if (todoToUpdate.title === editTitle.trim()) {
        setActiveEdit(null);

        return;
      }

      if (editTitle.trim() === '') {
        await handleDeleteTodos(todoId);

        return;
      }

      const data = { ...todoToUpdate, title: editTitle.trim() };

      await updateTodos(data, todoId);
      setTodos(prev =>
        prev.map(todo =>
          todo.id === todoId ? { ...todo, title: editTitle.trim() } : todo,
        ),
      );
      setActiveEdit(null);
    } catch (error) {
      setCurrentError(ErrorMessages.Update);
    } finally {
      setIsLoadingEdit(null);
    }
  };

  const handleEditTodoQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoQuery(event.target.value);
  };

  const defaultEditInputValue = (todoId: number) => {
    const data = todos.find(todo => todo.id === todoId);

    if (data) {
      setEditTodoQuery(data.title);
    }
  };

  const handleActivateEdit = (todoId: number) => {
    setActiveEdit(todoId);
    defaultEditInputValue(todoId);
  };

  return {
    isLoadingEdit,
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
