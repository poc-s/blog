import React, { Fragment, useState } from "react";
import classes from "./Pagination.module.css";

const Pagination = props => {
  const selectArray = [5, 10, 15, 20];
  const [next, disableNext] = useState(false);
  const [previous, disablePrevious] = useState(false);
  const handleNextClick = () => {
    const pageId = localStorage.getItem("pageId");
    const pageIdExist = pageId ? pageId : props.activePage;
    const paginationArray = [...props.pagesData];
    if (paginationArray.pop() === parseInt(pageId)) {
      disableNext(true);
    } else {
      const updatedPageId = parseInt(pageIdExist) + 1;
      props.handleClick(updatedPageId);
      localStorage.setItem("pageId", updatedPageId);
      disablePrevious(false);
    }
  };
  const handlePreviousClick = () => {
    const pageId = localStorage.getItem("pageId");
    const pageIdExist = pageId ? pageId : props.activePage;
    const paginationArray = [...props.pagesData];
    if (paginationArray.shift() === parseInt(pageId)) {
      disablePrevious(true);
    } else {
      const updatedPageId = parseInt(pageIdExist) - 1;
      props.handleClick(updatedPageId);
      localStorage.setItem("pageId", updatedPageId);
      disableNext(false);
    }
  };
  return (
    <Fragment>
      <button
        onClick={handlePreviousClick}
        disabled={previous || props.previousId}
      >
        PrEviOuS
      </button>
      {props.pagesData.map(p => (
        <div
          className={
            props.activePage === p
              ? `${classes["pagination"]} ${classes["active"]}`
              : `${classes["pagination"]}`
          }
          key={p}
          id="animation"
          onClick={() => props.handleClick(p)}
        >
          {p}
        </div>
      ))}
      <button onClick={handleNextClick} disabled={next || props.nextId}>
        {" "}
        NeXt
      </button>
      <span style={{ padding: "24px 0 0 105px" }}>
        <span style={{ color: "#1168b5" }}>Total Results : </span>
        {props.posts.length}
      </span>
      <span style={{ margin: "auto 0 auto auto" }}>
        <label>Per Page :</label>
        <select
          onChange={props.setPageNumber}
          value={props.selectedPostsPerPage}
        >
          {selectArray.map(data => (
            <option value={data} key={data}>
              {data}
            </option>
          ))}
        </select>
      </span>
    </Fragment>
  );
};

export default Pagination;
