import React from 'react';
import { useDispatch } from 'react-redux';
import { productSetActive } from '../../actions/products';
import { AddCartButton } from './AddCartButton';

export const ProductCard = ({product}) => {
        
    const dispatch = useDispatch();

    const handleOpenModal = (e) => {

        if(!e.target.classList.contains("noModal")){
            dispatch(productSetActive(product));
        }
    }
    
    return (
        <>
            <div className="itemCard" onClick={handleOpenModal}>

                <p className="titleProduct">{product.name}</p>
                <img className="imgProduct" alt="" src={`${product.img}` }/>
                <div className="bottomProduct">
                    
                    <p className="price">{`Price: $${product.price}`}</p>

                    <AddCartButton product={product} />
                    
                </div>
            </div>

            


        </>
    )
}
