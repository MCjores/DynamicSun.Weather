import React from 'react';
import Paginator from 'react-bootstrap/Pagination';
import { DOTS, usePagination } from 'app/paginatorHook';

interface IPaginator {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

const Pagination = (props: IPaginator) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];
  return (
    <Paginator>
      <Paginator.Prev disabled={currentPage === 1} onClick={onPrevious} />

      {paginationRange!.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <Paginator.Ellipsis />;
        }

        return (
          <Paginator.Item
            active={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Paginator.Item>
        );
      })}

      <Paginator.Next onClick={onNext} disabled={currentPage === lastPage} />
    </Paginator>
  );
};

export default Pagination;
