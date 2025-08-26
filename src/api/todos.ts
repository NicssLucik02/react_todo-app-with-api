import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3349;

// https://mate.academy/students-api/todos?userId=3345
export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
export const addTodos = (data: Todo) => {
  return client.post<Todo>(`/todos`, data);
};

export const deleteTodos = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodos = (data: Todo, todoId: number) => {
  return client.patch(`/todos/${todoId}`, data);
};
