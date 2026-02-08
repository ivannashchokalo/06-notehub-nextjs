import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPage: number;
  page: number;
  onPageSelect: (page: number) => void;
}

export default function Pagination({
  totalPage,
  page,
  onPageSelect,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPage}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageSelect(selected + 1)}
      forcePage={page - 1}
      nextLabel="→"
      previousLabel="←"
      renderOnZeroPageCount={null}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
