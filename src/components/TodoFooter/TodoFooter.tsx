import classNames from 'classnames';
import { FilterStatus } from '../../types/enums';
import { PropsFooter } from '../../types/Props';

export const TodoFooter: React.FC<PropsFooter> = ({
  todos,
  quantityActiveTasks,
  activeFilterStatus,
  handleChangeFilter,
  handleDeleteAllTodos,
}: PropsFooter) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${quantityActiveTasks()} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: activeFilterStatus === FilterStatus.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleChangeFilter(FilterStatus.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: activeFilterStatus === FilterStatus.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleChangeFilter(FilterStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: activeFilterStatus === FilterStatus.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleChangeFilter(FilterStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={quantityActiveTasks() === todos.length}
        onClick={handleDeleteAllTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
