import React, { useState, useEffect } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Icon } from "../../components/Component";

const CustomPagination = ({ hospitalList, page, setPage }) => {
  const itemsPerPage = 10;

  const [activeIndex, setActiveIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const totalHospLen = hospitalList.length;
    const dividedValue = Math.ceil(totalHospLen / itemsPerPage);
    setTotalPage(dividedValue);
  }, [hospitalList.length]);

  const paginationNext = () => {
    if (activeIndex < totalPage) {
      setPage(page + itemsPerPage);
      setActiveIndex(activeIndex + 1);
    }
  };

  const paginationPrev = () => {
    if (activeIndex > 1) {
      setPage(page - itemsPerPage);
      setActiveIndex(activeIndex - 1);
    }
  };

  const activePage = (index) => {
    setActiveIndex(index);
    setPage((index - 1) * itemsPerPage);
  };

  const mappedArray = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <Pagination aria-label="Page navigation example" listClassName="justify-content-center">
      <PaginationItem disabled={activeIndex === 1}>
        <PaginationLink
          className="page-link-prev"
          onClick={(ev) => {
            ev.preventDefault();
            paginationPrev();
          }}
        >
          <Icon name="chevrons-left" />
          <span>Prev</span>
        </PaginationLink>
      </PaginationItem>

      {mappedArray.map((data, index) => (
        <PaginationItem className={activeIndex === index + 1 ? "active" : ""}>
          <PaginationLink
            href="#item"
            onClick={(ev) => {
              ev.preventDefault();
              activePage(index);
            }}
          >
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={activeIndex === totalPage ? true : false}>
        <PaginationLink
          className="page-link-next"
          href="#next"
          onClick={(ev) => {
            ev.preventDefault();
            paginationNext();
          }}
        >
          <span>Next</span>
          <Icon name="chevrons-right" />
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

export default CustomPagination;
