import { fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types"

//la idea seria.
//se crea orden -> muestro en pantalla se creo orden con id tal

//pantalla orders listar todas las orders de un user

export const startCreateNewOrder = (preorder) => {

    return async (dispatch) => {
        
        const res = await fetchWithToken('orders/new', preorder, 'POST')
        const data = await res.json();

        if (data.success){
            dispatch(createNewOrder({id: data.id, user: data.user, name: data.name, products: data.products}))
        }

    dispatch(checkingOrders()); 


    }

}


export const startGetOrders = () => {

    return async (dispatch) => {

        const res = await fetchWithToken('orders');
        const data = await res.json();
        if(data.success){

            dispatch(listAllOrders(data.orders))
            
        }else{

            console.log(data.msg)

        }
        dispatch(finishCheckingOrders());
    }
}

const checkingOrders = () => ({ //para que cada vez que se genere una orden y se vuelven a cargar las ordenes aparezca loader
    type: types.orderStartChecking
})

const finishCheckingOrders = () => ({
    type: types.orderFinishChecking
})

export const startDeletingOrder = (id) => {

    return async (dispatch) => {

        const res = await fetchWithToken(`orders?id=${id}`, "", 'DELETE')
        
        const data = await res.json();

        if (data.success){
            dispatch(deleteOrder(id));
        }
        dispatch(checkingOrders())
    }

} 

// export const startEditOrder = (order) => {



// }

const deleteOrder = (id) => ({
    type: types.orderDeleteOne,
    payload: id
})

const createNewOrder = (order) => ({
    type: types.orderNewCreate,
    payload: order
})

const listAllOrders = (orders) => ({
    type: types.orderListAll,
    payload: orders
})