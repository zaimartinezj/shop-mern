import { types } from "../types/types";

const initialState={
    currentPage:null,
    totalPages:null,
    activeProduct: null,
    products: []
}

export const productsReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.productsAll:
            return {
                ...state,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
                products: action.payload.products
            }
        case types.productSetActive:
            return {
                ...state,
                activeProduct: action.payload
            }    
        case types.productRemoveActive:
            return {
                ...state,
                activeProduct:null
            }
            
    
        default:
            return state;
    }

}