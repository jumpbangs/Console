/* tslint:disable no-empty */
import React from 'react';
import { useTable, useFlexLayout, TableHeaderProps, useFilters } from 'react-table';

import Spinner from '../spinner';
import Pagination from './Pagination';
import EmptyState from '../emptyState';
import ReactTableProps from 'domain/misc/common/ReactTableProps';

/**
 * React table component.
 *
 * @param {ReactTableProps} props
 *
 * @returns {React.ReactElement}
 */
const Table: React.FC<ReactTableProps> = (props: ReactTableProps): React.ReactElement => {
  const {
    data,
    columns,
    hasMoreNext,
    hasMorePrevious,
    isLoading = false,
    onNext = () => {},
    onRowClick = () => {},
    onPrevious = () => {},
  } = props;

  const getStyles = (styleProps: Partial<TableHeaderProps>, align = 'left') => [
    styleProps,
    {
      style: {
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start',
        display: 'flex',
      },
    },
  ];

  const headerProps = (tableHeaderProps: Partial<TableHeaderProps>, { column }: any) =>
    getStyles(tableHeaderProps, column.align);

  const cellProps = (tableCellProps: Partial<TableHeaderProps>, { cell }: any) =>
    getStyles(tableCellProps, cell.column.align);

  const memoizedColumns = React.useMemo(() => columns, [columns]);

  const memoizedData = React.useMemo(() => data, [data]);

  const instance = useTable(
    {
      data: memoizedData,
      columns: memoizedColumns,
    },
    useFilters,
    useFlexLayout
  );

  const { getTableProps, headerGroups, rows, prepareRow, setHiddenColumns } = instance;

  React.useEffect(() => {
    setHiddenColumns(columns.filter((column) => !column.isVisible).map((column) => column.accessor));
  }, [setHiddenColumns, columns]);

  if (isLoading) {
    return (
      <div className="mt-18x">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && !data.length) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="table-wrapper">
        <div {...getTableProps()} className="table">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="table__head-row">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps(headerProps)} className="table__col table__col--head">
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
          <div className="table__body">
            {rows.map((row) => {
              prepareRow(row);

              return (
                <div {...row.getRowProps()} onClick={() => onRowClick(row)} className="table__row" key={row.id}>
                  {row.cells.map((cell) => {
                    return (
                      <div {...cell.getCellProps(cellProps)} className="table__col" key={cell.column.id}>
                        {cell.render('Cell')}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <Pagination
          onNext={onNext}
          onPrevious={onPrevious}
          hasMoreNext={hasMoreNext}
          hasMorePrevious={hasMorePrevious}
        />
      </div>
    </>
  );
};

export default Table;
