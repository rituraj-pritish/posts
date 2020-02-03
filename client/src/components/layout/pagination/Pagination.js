import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

import './Pagination.css';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleClick = e => {

  };

  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={10}
      initialPage={currentPage}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={handleClick}
      containerClassName={'pagination'}
      pageClassName={'page'}
      activeClassName={'active'}
    />
  );
};

export default Pagination;
