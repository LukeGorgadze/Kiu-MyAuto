import React, { FC } from 'react';
import {MdKeyboardArrowRight} from 'react-icons/md'
import {MdKeyboardArrowLeft} from 'react-icons/md'
import {MdKeyboardDoubleArrowRight} from 'react-icons/md'
import {MdKeyboardDoubleArrowLeft} from 'react-icons/md'
interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPageCount: number;
  getProperUrl: (manStr: string, catStr: string) => void;
}

const Pager: FC<Props> = ({ currentPage, setCurrentPage, totalPageCount ,getProperUrl}) => {
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPageCount);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(totalPageCount, currentPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="Pager">
      <button className="pager-button" onClick={handleFirstPage}>
        <MdKeyboardDoubleArrowLeft/>
      </button>
      <button className="pager-button" onClick={handlePreviousPage}>
        <MdKeyboardArrowLeft/>
      </button>
      <ul className="pagination">
        {renderPageNumbers()}
      </ul>
      <button className="pager-button" onClick={handleNextPage}>
        <MdKeyboardArrowRight/>
      </button>
      <button className="pager-button" onClick={handleLastPage}>
        <MdKeyboardDoubleArrowRight/>
      </button>
    </div>
  );
};

export default Pager;
