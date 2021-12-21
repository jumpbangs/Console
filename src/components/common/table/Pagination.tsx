import React from 'react';

interface PaginationProps {
  onNext?: () => void;
  hasMoreNext?: boolean;
  onPrevious?: () => void;
  hasMorePrevious?: boolean;
}

type InjectedProps = PaginationProps;

/**
 * Pagination component
 *
 * @returns {React.ReactElement}
 */
const Pagination: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const { onNext, onPrevious, hasMoreNext, hasMorePrevious } = props;

  return (
    <div className="pagination-wrapper">
      <div className="pagination">
        {hasMorePrevious && (
          <button className="btn pagination__btn prev" onClick={onPrevious}>
            Previous
          </button>
        )}
        {hasMoreNext && (
          <button className="btn pagination__btn next" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
