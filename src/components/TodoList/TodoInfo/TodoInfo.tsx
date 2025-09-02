import classNames from 'classnames';
import { useEffect } from 'react';
import { Todo } from '../../../types/types';

export type Props = {
  todo: Todo;
  handleCheckTodo: (id: number) => void;
  handleDeleteTodos: (todoId: number) => void;
  isLoadingTodos: boolean;
  isLoadingAdd: boolean;
  isLoadingDelete: number[];
  isLoadingUpdate: number[];
  isLoadingEdit: number | null;
  handleActivateEdit: () => void;
  activeEdit: number | null;
  editTodoQuery: string;
  handleEditTodoQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  handleEditTodo: (todoId: number, editTitle: string) => void;
  setEditTodoQuery: (value: string) => void;
  setActiveEdit: (todoId: number | null) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  handleCheckTodo,
  handleDeleteTodos,
  isLoadingTodos,
  handleActivateEdit,
  activeEdit,
  editTodoQuery,
  handleEditTodoQuery,
  handleEditTodo,
  inputRef,
  setEditTodoQuery,
  setActiveEdit,
  isLoadingAdd,
  isLoadingDelete,
  isLoadingUpdate,
  isLoadingEdit,
}) => {
  useEffect(() => {
    if (activeEdit === todo.id && inputRef.current) {
      inputRef.current.focus();
      setEditTodoQuery(todo.title);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeEdit === todo.id) {
        setActiveEdit(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEdit, todo.id, todo.title]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      onDoubleClick={handleActivateEdit}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleCheckTodo(todo.id)}
        />
      </label>

      {activeEdit !== todo.id ? (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodos(todo.id)}
          >
            ×
          </button>
        </>
      ) : (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleEditTodo(todo.id, editTodoQuery);
          }}
        >
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTodoQuery}
            onChange={handleEditTodoQuery}
            onBlur={() => handleEditTodo(todo.id, editTodoQuery)}
          />
        </form>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active':
            isLoadingTodos ||
            (todo.id === 0 && isLoadingAdd) ||
            isLoadingDelete.includes(todo.id) ||
            isLoadingUpdate.includes(todo.id) ||
            isLoadingEdit === todo.id,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
