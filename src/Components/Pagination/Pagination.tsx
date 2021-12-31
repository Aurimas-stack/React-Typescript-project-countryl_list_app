import React, { useState, useEffect } from "react";

import { DataProvider } from "../Utils/types";
import { CountryProps } from "../Country/Country";
import { Button } from "../Small-Components/Buttons";

import { getPaginationGroupArray } from "../Utils/Utils";

import "./Pagination.css";

interface Props {
  pageLimit: number;
  dataLimit: number;
  miles: string[];
  data: DataProvider[];
  RenderComponent: React.FunctionComponent<CountryProps>;
  handleAreaUnits: (e: React.MouseEvent, name: string) => void;
}

export const Pagination: React.FC<Props> = ({
  data,
  RenderComponent,
  pageLimit,
  dataLimit,
  handleAreaUnits,
  miles,
}): JSX.Element => {
  let totalPage: number = Math.ceil(data.length / dataLimit);
  const [pages] = useState<number>(Math.ceil(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleNextPage = () => {
    if (currentPage === totalPage) {
      return;
    }

    setCurrentPage((page) => page + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage((page) => page - 1);
  };

  const handleArrowPress = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePreviousPage();
    }

    if (e.key === "ArrowRight") {
      handleNextPage();
    }
  };

  const handleChangePage = (e: React.BaseSyntheticEvent) => {
    const page: number = Number(e.target.textContent);
    setCurrentPage(page);
  };

  const getPaginatedData = (): DataProvider[] => {
    const startIndex: number = currentPage * dataLimit - dataLimit;
    const endIndex: number = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = (): number[] => {
    const paginationNumbers = getPaginationGroupArray(currentPage, pageLimit);
    let index: number;

    if (paginationNumbers.includes(totalPage)) {
      index = paginationNumbers.indexOf(totalPage);
      paginationNumbers.length = index + 1;
      return paginationNumbers;
    }

    return paginationNumbers;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleArrowPress);
    return function cleanup() {
      window.removeEventListener("keydown", handleArrowPress);
    };
  }, [handleArrowPress]);
  
  return (
    <div>
      {/* show the posts, 10 posts at a time */}
      <div className="dataContainer">
        {getPaginatedData().map((data, index) => (
          <RenderComponent
            key={index}
            data={data}
            onHandleAreaUnits={handleAreaUnits}
            miles={miles}
          />
        ))}
      </div>
      <div className="pagination">
        {/* previous button */}
        <Button
          generalName={`prev ${currentPage === 1 ? "disabled" : ""}`}
          handler={handlePreviousPage}
          name={"prev"}
        />

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            id={index.toString()}
            onClick={handleChangePage}
            className={`paginationItem ${
              currentPage === item ? "active" : "inactive"
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <Button
          generalName={`next ${currentPage === pages ? "disabled" : ""}`}
          handler={handleNextPage}
          name={"next"}
        />
      </div>
    </div>
  );
};
