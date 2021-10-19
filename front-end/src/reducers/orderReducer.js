import { types } from "../types/types";

const initialState=  {
        orders: [],
        checking: true
    }

export const orderReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.orderStartChecking: 
            return {
                ...state,
                checking: true
            }
        case types.orderFinishChecking:
            return {
                ...state,
                checking: false
            }
        case types.orderNewCreate:
            return {
                ...state,
                orders: [...state.orders, action.payload]
            }
        case types.orderListAll:
            return {
                ...state,
                orders: action.payload
            }
        case types.orderDeleteOne:
            return {
                ...state,
                orders: state.orders.filter(order=>order._id!==action.payload)
            }
    
        default:
            return state;
    }
}