import React, {useEffect} from 'react';
import { Header } from '../ui/Header';
import { useDispatch, useSelector } from 'react-redux';
import { productRemoveActive, startGetProducts } from '../../actions/products';
import { ProductsList } from './ProductsList';
import { ProductModal } from './ProductModal';
import { FilterBox } from './FilterBox';
import { Footer } from '../ui/Footer';

export const ShopScreen = () => {
    
    const dispatch = useDispatch();

    const closeModal = (e) => {
        if(activeProduct){
        if(!e.target.matches(".modal")){
            dispatch(productRemoveActive());
        }
    }
    }

    useEffect(() => {
        
        dispatch(startGetProducts());

    }, [dispatch])

    const {products, activeProduct} = useSelector( state => state.products );
    
    return (<div className="page"  onClick={closeModal}>
                <Header/>
                
                <FilterBox/>

                <ProductsList products={products}/>

                {activeProduct && <ProductModal/>}

                <Footer/>
            </div>
    )
}
