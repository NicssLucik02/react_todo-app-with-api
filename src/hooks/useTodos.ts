import { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { addTodos, deleteTodos, getTodos, updateTodos } from '../api/todos';
import { ErrorMessages } from '../types/enums';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [currentError, setCurrentError] = useState<ErrorMessages | ''>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editTodoQuery, setEditTodoQuery] = useState('');
  const [activeEdit, setActiveEdit] = useState<number | null>(null);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<number[]>([]);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<number[]>([]);

  useEffect(() => {
    if (!currentError) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentError]);

  useEffect(() => {
    if (
      !isLoadingTodos &&
      !isLoadingAdd &&
      isLoadingDelete.length === 0 &&
      isLoadingUpdate.length === 0 &&
      inputRef.current
    ) {
      inputRef.current.focus();
    }
  }, [isLoadingTodos, isLoadingAdd, isLoadingDelete, isLoadingUpdate]);

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

  const handleDeleteAllTodos = async () => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);

      await Promise.all(completedTodos.map(item => handleDeleteTodos(item.id)));
    } catch (error) {
      setCurrentError(ErrorMessages.Delete);
    }
  };

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

  const handleEditTodo = async (todoId: number, editTitle: string) => {
    setIsLoadingTodos(true);

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
        handleDeleteTodos(todoId);

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
      setIsLoadingTodos(false);
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
    todos,
    isLoadingTodos,
    isLoadingAdd,
    isLoadingDelete,
    isLoadingUpdate,
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
