import React from 'react';
import { useDispatch } from 'react-redux';
import { cartRemoveProduct } from '../../../actions/cart';
import {AiOutlineDelete} from 'react-icons/ai';

export const CartItem = ({product}) => {
    
    const dispatch = useDispatch();
    const handleDeleteProductCart = () => {
        
        dispatch(cartRemoveProduct(product._id))
        
    }

    return (
        <tr key={product._id}>
                            <td >{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td><button className="btn-delete" onClick={handleDeleteProductCart}><AiOutlineDelete/></button></td>
        </tr>
    )
}
