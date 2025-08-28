import { FilterStatus } from './enums';
import { Todo } from './Todo';

export type PropsHeader = {
  quantityActiveTasks: number;
  handleSearchQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string | '';
  inputRef: React.RefObject<HTMLInputElement>;
  setSearchQuery: (value: string) => void;
  isLoadingTodos: boolean;
  isLoadingAdd: boolean;
  handleAddTodo: (
    title: string,
    setSearchQuery: (value: string) => void,
  ) => void;
  handleToggleAll: () => void;
  todos: Todo[];
};

export type PropsInfo = {
  todo: Todo;
  handleCheckTodo: (id: number) => void;
  handleDeleteTodos: (todoId: number) => void;
  isLoadingTodos: boolean;
  isLoadingAdd: boolean;
  isLoadingDelete: number[];
  isLoadingUpdate: number[];
  handleActivateEdit: () => void;
  activeEdit: number | null;
  editTodoQuery: string;
  handleEditTodoQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  handleEditTodo: (todoId: number, editTitle: string) => void;
  setEditTodoQuery: (value: string) => void;
  setActiveEdit: (todoId: number | null) => void;
};

export type PropsMain = {
  filteredTodos: Todo[];
  isLoadingTodos: boolean;
  isLoadingDelete: number[];
  isLoadingUpdate: number[];
  handleCheckTodo: (id: number) => void;
  handleDeleteTodos: (todoId: number) => void;
  handleEditTodo: (todoId: number, editTitle: string) => void;
  editTodoQuery: string;
  handleEditTodoQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  handleActivateEdit: (todoId: number) => void;
  activeEdit: number | null;
  setEditTodoQuery: (value: string) => void;
  setActiveEdit: (todoId: number | null) => void;
  isLoadingAdd: boolean;
};

export type PropsError = {
  currentError: string | null;
  handleHideError: () => void;
};

export type PropsFooter = {
  todos: Todo[];
  quantityActiveTasks: number;
  activeFilterStatus: string;
  handleChangeFilter: (type: FilterStatus) => void;
  handleDeleteAllTodos: () => void;
};
