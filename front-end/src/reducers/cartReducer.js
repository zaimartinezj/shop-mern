import { types } from "../types/types";

const initialState = {
    products: [],
    checking: true
}

export const cartReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.cartfinishChecking:
            return {
                ...state,
                checking: false
            }
        case types.cartAddProduct:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case types.cartRemoveProduct:
            return {
                ...state,
                products: (state.products).filter((product)=>product._id !== action.payload)
            }
        case types.cartClear:
            return initialState;
        default:
            return state;
    }

}