import { Todo } from '../../types/types';
import { TodoInfo } from './TodoInfo/TodoInfo';

export type Props = {
  filteredTodos: Todo[];
  isLoadingTodos: boolean;
  isLoadingDelete: number[];
  isLoadingUpdate: number[];
  isLoadingEdit: number | null;
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

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  isLoadingTodos,
  isLoadingAdd,
  isLoadingDelete,
  isLoadingUpdate,
  isLoadingEdit,
  handleDeleteTodos,
  handleCheckTodo,
  handleEditTodo,
  editTodoQuery,
  handleEditTodoQuery,
  inputRef,
  handleActivateEdit,
  activeEdit,
  setEditTodoQuery,
  setActiveEdit,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo: Todo) => {
        return (
          <TodoInfo
            key={todo.id}
            todo={todo}
            handleCheckTodo={handleCheckTodo}
            handleDeleteTodos={handleDeleteTodos}
            isLoadingTodos={isLoadingTodos}
            handleActivateEdit={() => handleActivateEdit(todo.id)}
            activeEdit={activeEdit}
            editTodoQuery={editTodoQuery}
            handleEditTodoQuery={handleEditTodoQuery}
            handleEditTodo={handleEditTodo}
            inputRef={inputRef}
            setEditTodoQuery={setEditTodoQuery}
            setActiveEdit={setActiveEdit}
            isLoadingAdd={isLoadingAdd}
            isLoadingDelete={isLoadingDelete}
            isLoadingUpdate={isLoadingUpdate}
            isLoadingEdit={isLoadingEdit}
          />
        );
      })}
    </section>
  );
};
