import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startGetProducts } from '../../actions/products';
import { GrNext, GrPrevious } from 'react-icons/gr';

export const FilterBox = () => {

    const {currentPage, totalPages} = useSelector( state => state.products );
    const [selectValue, setSelectValue] = useState(null);
    const dispatch = useDispatch();
        
    const handleSortSelect = (e) => {

        if (e.target.value === "highlow"){
            setSelectValue("-price");
            dispatch( startGetProducts( currentPage, "-price" ) );

        }else if (e.target.value === "lowhigh"){
            setSelectValue("price");
            dispatch( startGetProducts( currentPage, "price" ) );
        }
        
    }

    const handleChangePage = (e) => {

        const page = e.target.getAttribute('data-key');
        if (page === 'prev'){
            if(currentPage > 1 ){
                dispatch( startGetProducts( currentPage - 1, selectValue ));

            }
        }else if (page === 'next'){
            if(currentPage + 1 <= totalPages){

                dispatch( startGetProducts( currentPage + 1, selectValue ));

            }
        }else{
            
            dispatch( startGetProducts(Number(page), selectValue));
            
        }
        
             
    }
    
    let buttonsPagination = [<span key="-1" className="btnPag"><GrPrevious onClick={handleChangePage} data-key="prev" key="prev"/></span>]
    
    for (let i=1; i<=totalPages;i++){
        buttonsPagination = [...buttonsPagination, <button className={currentPage === i ? "btnPag btnDisabled" : "btnPag"} data-key={`${i}`}  key={`${i}`} onClick={handleChangePage}>{i}</button>]
    }
    buttonsPagination = [...buttonsPagination, <span key="0" className="btnPag"><GrNext onClick={handleChangePage} data-key="next" key="next"/></span>]
    
    return (
        <div className="filterBox">
        <select id="cars" name="cars" onChange={ handleSortSelect }>

            <option key="default" value="default" defaultValue>Sort by</option>
            <option key="highlow" value="highlow" >Price high - low</option>
            <option key="lowhigh" value="lowhigh" >Price low - high</option>

        </select>  
        <div className="pagination">
            {
                buttonsPagination
            }
        </div>
        </div>
    )
}
