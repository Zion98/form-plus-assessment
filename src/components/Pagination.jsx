import React from "react";
import styled from "styled-components";

const Pagination = ({
  pages,
  changePage,
  inputValue,
  currentPage,
  goToNextPage,
  goToPreviousPage,
}) => {
  return (
    <PaginationWrapper className="flex justify-between items-center  my-12 text-[#3F3F3F]">
      <button
        disabled={currentPage <= 1}
        onClick={goToPreviousPage}
        className="inline-block nav-btn"
      >
        Previous
      </button>
      <div className="input-box">
        <input
          className="text-input nav-btn"
          type="text"
          value={inputValue}
          onChange={changePage}
        />{" "}
        of {pages}
      </div>
      <button
        disabled={currentPage >= pages}
        onClick={goToNextPage}
        className="inline-block"
      >
        Next
      </button>
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
width:100%;
margin: 1rem 4rem;
  .text-input {
    max-width: 40px;
    background: #ffffff;
    border: 1px solid #3f3f3f;
    border-radius: 3px;
    outline: none;
  }

  .nav-btn:disabled {
    color: #928f8f;
  }
`;

export default Pagination;
