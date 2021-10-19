import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateNewOrder } from '../../../actions/order';
import { Footer } from '../../ui/Footer';
import { Header } from '../../ui/Header';

import { CartItem } from './CartItem';
import { cartClear } from '../../../actions/cart';
import { NavLink, useHistory } from 'react-router-dom';

export const CartScreen = () => {
    
    const history = useHistory();

    const {products} = useSelector( state => state.cart );
    const {uid} = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const [additionalComment, setAddComment] = useState("");
    
    const [price, setTotalPrice] = useState(0)

    const handleAddComment = (e) => {
        setAddComment(e.target.value);
    }

    useEffect(() => {
        if(products.length > 0){
            const arrayPrices = products.map(product=>Number(product.price));
            setTotalPrice(arrayPrices.reduce((acum, priceProduct)=>acum + priceProduct));
        }else{
            setTotalPrice(0)
        }
    }, [products])

    const handleNewOrder = () => {

        const order = {
            products,
            additionalComment
        }

        dispatch(startCreateNewOrder(order));

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Order created!',
            showConfirmButton: false,
            timer: 1500
          })
        dispatch(cartClear());
    }
    
    if (products.length === 0){
        return <>
            <Header/>
            <div className="screen">
            <h1>Your cart is empty!</h1>
            <button onClick={()=>{
                        return history.push('/')}}
                    >
                        Go back to the shop
                    </button>
            </div>
            <Footer/>
        </>
        
    }

    return (
        <>
        <Header/>
        <div className="screen-table">
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                                products.map(product=><CartItem key={product._id} product={product}/>)
                    }
                </tbody>
            </table>
            <div className="cart-order-form">
                <p>Total price: ${price}</p>
                <textarea
                    className="addComment"
                    placeholder="Additional comments (optional)"
                    value={additionalComment}
                    onChange={handleAddComment}
                    />
                    {
                uid ?
                <button className="btn-green" onClick={handleNewOrder}>Make an order!</button> 
                    :<>
                <button className="btn-green btnDisabled">Make an order!</button>
                <NavLink className="navlink" to="/auth/login">Sign in to make an order</NavLink>
                </>
                    }

            </div>
        </div>
        <Footer/>        
        </>
    )
}
