import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productRemoveActive } from '../../actions/products';
import { AddCartButton } from './AddCartButton';
export const ProductModal = () => {

  
    const product = useSelector( state => state.products.activeProduct);
    
    const dispatch = useDispatch();

   
    const handleCloseModal = () => {
        dispatch(productRemoveActive());
    }

    return (
            <div className="modal modalBox">
                <button className="btnCloseModal" onClick={handleCloseModal}>X</button>
                <p className="modal titleProduct">{product.name}</p>
                <p className="modal descProduct">{product.description}</p>
                <img className="modal imgProductModal" alt="" src={`${product.img}` }/>
                <div className="modal bottomProduct">
                    <span className="modal price">{`Price: $${product.price}`}</span>

                    <AddCartButton product={product} />
                </div>
            </div>
    )
}
