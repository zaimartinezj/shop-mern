import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cartAddProduct, cartRemoveProduct } from '../../actions/cart';
import Swal from 'sweetalert2';

export const AddCartButton = ({product}) => {
    let {products} = useSelector( state => state.cart );

    products = products.map(product=>product._id);

    
    const dispatch = useDispatch();

    const handleDeleteProductCart = () => {
        
        dispatch(cartRemoveProduct(product._id))
        
    }

    const handleAddProductToCart = (e) => {
        if (!e.target.matches('.disabled')){
        dispatch(cartAddProduct(product));
        }
        Swal.fire({
            position: 'top-end',
            title: 'Product added to cart',
            showConfirmButton: false,
            timer: 1500
          })

    }

    return (
        <>

{   products.includes(product._id) 
    ?
        <button className="btn-delete noModal" onClick={handleDeleteProductCart}>Remove from your cart</button>
    :
        <button onClick={handleAddProductToCart} className="btn-green noModal" >Add to your cart</button> 
         
}
        
        </>
    )
}
