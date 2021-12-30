import React, { useState, useEffect } from "react"

import { DataProvider } from "../Utils/types";
import { CountryProps } from "../Country/Country";
import { Button } from "../Small-Components/Buttons";

import { getPaginationGroupArray } from "../Utils/Utils";

import './Pagination.css';


interface Props {
  pageLimit: number;
  dataLimit: number;
  miles: string[];
  data: DataProvider[];
  RenderComponent: React.FunctionComponent<CountryProps>;
  changeAreaUnits: (e: React.MouseEvent, name:string) => void;
}

export const Pagination: React.FC<Props> = ({data, RenderComponent, pageLimit, dataLimit, changeAreaUnits, miles }): JSX.Element => {
    let totalPage:number = Math.round(data.length / dataLimit);
    const [pages] = useState<number>(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState<number>(1);

    const nextPage = () => {
        if(currentPage === totalPage) {
            return;
        }

        setCurrentPage(page => page + 1);
    }
    const previousPage = () => {
        if(currentPage === 1) {
          return;
        }

        setCurrentPage(page => page - 1);
    }
    const onArrowPress = (e: KeyboardEvent) => {
        if(e.key === "ArrowLeft") {
            previousPage();
        } 
        if(e.key === "ArrowRight") {
            nextPage();
        } 
    }
    const changePage = (e: React.BaseSyntheticEvent) => {
        const page: number = Number(e.target.textContent);
        setCurrentPage(page)
    }
    const getPaginatedData = (): DataProvider[] => {
        const startIndex:number = currentPage * dataLimit - dataLimit;
        const endIndex:number = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    }
    const getPaginationGroup = (): number[] => {
      const paginationNumbers = getPaginationGroupArray(currentPage, pageLimit);
      let index: number;

      if(paginationNumbers.includes(totalPage)) {
        index = paginationNumbers.indexOf(totalPage);
        paginationNumbers.length = index + 1;
        return paginationNumbers
      } 

      return paginationNumbers
    }
    useEffect(() => {
        window.addEventListener("keydown", onArrowPress);
        return function cleanup() {
          window.removeEventListener("keydown",onArrowPress);

        };
      }, [onArrowPress])
    return (
        <div>
        {/* show the posts, 10 posts at a time */}
        <div className="dataContainer">
          {getPaginatedData().map((data, index) => (
            <RenderComponent 
              key={index} 
              data={data} 
              changeAreaUnits={changeAreaUnits}
              miles={miles}
              />
          ))}
        </div>
    
        {/* show the pagiantion
            it consists of next and previous buttons
            along with page numbers, in our case, 8 page
            numbers at a time
        */}
        <div className="pagination">
          {/* previous button */}
          <Button 
            generalName={`prev ${currentPage === 1 ? 'disabled' : ''}`} 
            handler={previousPage} 
            name={'prev'}/>
    
          {/* show page numbers */}
          {getPaginationGroup().map((item, index) => (
            <button 
              key={index} 
              id={index.toString()} 
              onClick={changePage}
              className={`paginationItem ${currentPage === item ? 'active' : 'inactive'}`}
            >
              <span>{item}</span>
            </button>
          ))}
    
          {/* next button */}
          <Button 
            generalName={`next ${currentPage === pages ? 'disabled' : ''}`} 
            handler={nextPage} 
            name={'next'}/>
        </div>
      </div>
    );

}