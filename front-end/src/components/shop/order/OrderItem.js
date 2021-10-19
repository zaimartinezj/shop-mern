import React from 'react'
// import { BiEdit } from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { startDeletingOrder } from '../../../actions/order';

export const OrderItem = ({order}) => {
    const dispatch = useDispatch();
    const handleDeleteOrder = () => {
        dispatch(startDeletingOrder(order._id));
    }

    // const handleEditOrder = () => {

    // }

    const date = new Date(order.dateCreated);
    
    return (
        <tr key={order._id}>
            <td className="orderId">{order._id}</td>
            <td> {
                 order.products.map(product=><p key={product._id + order._id}> {product.name} </p>)
            }
            </td>
            <td>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</td>
            <td>
                {/* <button onClick={ handleEditOrder } className="btn-edit"><BiEdit/></button> */}
                <button onClick={ handleDeleteOrder } className="btn-delete"><AiOutlineDelete/></button>
            </td> 
        </tr>
        
    )
}
