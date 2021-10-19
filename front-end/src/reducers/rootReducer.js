import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";
import { orderReducer } from "./orderReducer";
import { productsReducer } from "./productsReducer";

export const rootReducer = 
        combineReducers({
            auth: authReducer,
            products: productsReducer,
            cart: cartReducer,
            order: orderReducer
        })
