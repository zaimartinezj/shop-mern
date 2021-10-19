import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from '../reducers/rootReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//para tener el Redux DevTools Extension y el middleware

export const store = createStore(
    
    rootReducer,
    composeEnhancers(
        applyMiddleware( thunk ) // para tareas asincronas
    )
);