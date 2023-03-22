import React, {useContext} from "react";
import { MyContext } from "./context";


const Pagination = ()=> {

    const {totalPageNum, currentPageIndex, setCurrentPageIndex} = useContext(MyContext)             // we fetched necessary constants
    let numArray = []

    function createPageNumbers(){
        for (let index = 0; index < totalPageNum; index++) {                                 // created an empty array and filled it up with the numbers till totalPageNum so that we can use map func
            numArray.push(index+1)
        }
    }
    createPageNumbers()

    return(
        <div className="pagination">
            
            <div className={currentPageIndex !== 0 ? "arrow previous" : "arrow previous disabled"} onClick={()=>setCurrentPageIndex(currentPageIndex - 1)}><i className="fa-solid fa-backward"></i></div>

            {
               numArray.map((num,ind)=>
                 ind === currentPageIndex ? <div key={ind} className="pageNum pnActive" onClick={()=>setCurrentPageIndex(ind)}>{num}</div> : <div key={ind} className="pageNum" onClick={()=>setCurrentPageIndex(ind)}>{num}</div>
               )
            }
            
            <div className={(currentPageIndex + 1) < totalPageNum ? "arrow next" : "arrow next disabled"} onClick={()=>setCurrentPageIndex(currentPageIndex + 1)}><i className="fa-solid fa-forward"></i></div>
            
        </div>
    )
}
export default Pagination;