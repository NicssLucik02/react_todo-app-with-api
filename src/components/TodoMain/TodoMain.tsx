import { PropsMain } from '../../types/Props';
import { Todo } from '../../types/Todo';
import { TodoInfo } from './TodoInfo/TodoInfo';

export const TodoMain: React.FC<PropsMain> = ({
  filteredTodos,
  isLoadingTodos,
  isLoadingAdd,
  isLoadingDelete,
  isLoadingUpdate,
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
}: PropsMain) => {
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
          />
        );
      })}
    </section>
  );
};
