import React from "react";
import _ from "lodash";

interface IPagination {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
const Pagination: React.FunctionComponent<IPagination> = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  const pages: number[] = _.range(1, pageCount + 1);

  let secondPagesArr: number[] = pages.slice(currentPage-1,currentPage+4);

  if (currentPage === pages[pages.length-1]){
    secondPagesArr = pages.slice(currentPage-5, currentPage);
  }

  if (secondPagesArr.length<5){
    let count:number = 5-secondPagesArr.length;
    secondPagesArr.unshift(...pages.slice((currentPage-1) - count, currentPage-1));
  }

  return (
    <nav>
      <ul className="pagination" style={{paddingTop:"1vw"}}>

      {currentPage > pages[0] ?
            <li style={{paddingRight:"1vw"}}>
            <a className="page-link" onClick={() => onPageChange(currentPage-1)}>
              Previous
            </a>
          </li>
          : ''
      }
      {currentPage > pages[0] ?
        <li>
          <a className="page-link" onClick={() => onPageChange(1)}>
            1
          </a>
        </li>
        : ''
      }
      {currentPage > pages[0] ?
            <li>
            <a className="page-link">
              ...
            </a>
          </li>
          : ''
      }
        {secondPagesArr.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        {currentPage < pages[pages.length-5] ?
            <li>
            <a className="page-link">
              ...
            </a>
          </li>
          : ''
          }
        {currentPage < pages[pages.length-5] ?
          <li>
          <a className="page-link" onClick={() => onPageChange(pageCount)}>
            {pageCount}
          </a>
        </li>
          : ""
        }
        {currentPage < pages[pages.length-1]  ?
            <li  style={{paddingLeft:"1vw"}}>
            <a className="page-link" onClick={() => onPageChange(currentPage+1)}>
              Next
            </a>
          </li>
          : ''
      }
      </ul>
    </nav>
  );
};

export default Pagination;
