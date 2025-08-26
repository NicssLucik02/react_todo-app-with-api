import classNames from 'classnames';
import { PropsInfo } from '../../../types/Props';
import { useEffect } from 'react';

export const TodoInfo = ({
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
}: PropsInfo) => {
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
  }, [ activeEdit, todo.id,todo.title ]);

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
            isLoadingUpdate.includes(todo.id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
