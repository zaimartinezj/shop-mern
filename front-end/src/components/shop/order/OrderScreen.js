import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startGetOrders } from '../../../actions/order';
import { Footer } from '../../ui/Footer';
import { Header } from '../../ui/Header';
import { OrderItem } from './OrderItem';

export const OrderScreen = () => {

    const history = useHistory();

    const dispatch = useDispatch();
    const {orders, checking} = useSelector( state => state.order );

    useEffect(() => {
        dispatch(startGetOrders())
    }, [dispatch, checking])


    if (checking){
        return <>
                    <Header/>
                    <div className="screen">
                        <div className="box-loader"><div className="loader"></div>
                        <p>Loading orders. . .</p>
                        </div>
                        
                    </div>
                    <Footer/>
        </>
    }
    
    if (orders.length === 0){
        return <>
               <Header/>
                <div className="screen">
                    <h1>You do not have any order yet!</h1>
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
                        <th>Order id</th>
                        <th>Products</th>
                        <th>Date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {                   
                        orders.map(order=><OrderItem key={order._id} order={order} />)                   
                    }
                    
                    
                </tbody>
                </table>
            </div>
            <Footer/>
            </>

    )
}
