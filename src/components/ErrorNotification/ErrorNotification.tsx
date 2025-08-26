import classNames from 'classnames';
import { PropsError } from '../../types/Props';

export const ErrorNotification: React.FC<PropsError> = ({
  currentError,
  handleHideError,
}: PropsError) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !currentError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleHideError}
      />
      {currentError}
    </div>
  );
};
