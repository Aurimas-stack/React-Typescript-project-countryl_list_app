import { useState, useEffect } from "react"
import './Pagination.css';

type Props = {
    data: any[],
    RenderComponent: any,
    pageLimit: number,
    dataLimit: number,
    changeAreaUnits: (e: React.MouseEvent, name:string) => void,
    miles: string[]
}

export const Pagination: React.FC<Props> = ({data, RenderComponent, pageLimit, dataLimit, changeAreaUnits, miles }) => {
    let totalPage:number = Math.round(data.length / dataLimit);
    console.log(totalPage)
    const [pages] = useState<number>(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState<number>(1);

    const nextPage = (): void => {
        if(currentPage < totalPage) {
            setCurrentPage(page => page + 1);
        }
    }
    const previousPage = (): void => {
        if(currentPage > 1) {
            setCurrentPage(page => page - 1);
        }
    }
    const onArrowPress = (e:any): void => {
        if(e.keyCode === 37) {
            if(currentPage > 1) {
                setCurrentPage(page => page - 1);
            }
        } 
        if(e.keyCode === 39) {
            if(currentPage < totalPage) {
                setCurrentPage(page => page + 1);
            }
        } 
    }
    const changePage = (e: any): void => {
        const page: number = Number(e.target.textContent);
        setCurrentPage(page)
    }
    const getPaginatedData = () => {
        const startIndex:number = currentPage * dataLimit - dataLimit;
        const endIndex:number = startIndex + dataLimit;
        return data.slice(startIndex, endIndex)
    }
    const getPaginationGroup = () => {
      let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
      let paginationNumbers = new Array(pageLimit).fill(null).map((_, idx) => start + idx + 1)
      let index: number;
      console.log(pages)
      console.log(paginationNumbers.includes(pages))
      if(paginationNumbers.includes(totalPage)) {
        index = paginationNumbers.indexOf(totalPage);
        console.log(index)
        paginationNumbers.length = index + 1;
        console.log(paginationNumbers)
        return paginationNumbers
      } else {
        console.log(paginationNumbers)
          return paginationNumbers
      }

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
          <button
            onKeyDown={onArrowPress}
            onClick={previousPage}
            className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
          >
            prev
          </button>
    
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
          <button
            onClick={nextPage}
            onKeyDown={onArrowPress}
            className={`next ${currentPage === pages ? 'disabled' : ''}`}
          >
            next
          </button>
        </div>
      </div>
    );

}