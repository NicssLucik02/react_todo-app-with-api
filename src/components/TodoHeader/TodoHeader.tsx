import classNames from 'classnames';
import { PropsHeader } from '../../types/Props';

export const TodoHeader: React.FC<PropsHeader> = ({
  quantityActiveTasks,
  handleSearchQuery,
  searchQuery,
  handleAddTodo,
  inputRef,
  setSearchQuery,
  isLoadingTodos,
  isLoadingAdd,
  handleToggleAll,
  todos,
}: PropsHeader) => {
  return (
    <header className="todoapp__header">
      {!isLoadingTodos && todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: quantityActiveTasks() === 0,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form
        onSubmit={e => {
          e.preventDefault();
          handleAddTodo(searchQuery, setSearchQuery);
        }}
      >
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={searchQuery}
          onChange={handleSearchQuery}
          disabled={isLoadingAdd}
        />
      </form>
    </header>
  );
};
