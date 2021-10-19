import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { startChecking } from "../actions/auth";
import { ShopScreen } from "../components/shop/ShopScreen";
import { AuthRouter } from "./AuthRouter";
import { CartScreen } from "../components/shop/cart/CartScreen";
import { OrderScreen } from "../components/shop/order/OrderScreen";
import { cartAddProduct, cartfinishChecking } from "../actions/cart";

export const AppRouter = () => {
 const dispatch = useDispatch();
 const {checking, uid} = useSelector( state => state.auth );
 const {products} = useSelector( state => state.cart );

//Cuando carga pagina por primera vez chequear el cart del localStorage
  useEffect(()=>{
    const cartStorage = localStorage.getItem('cart');
      if (cartStorage){  

        const cartProducts = JSON.parse(cartStorage);
        cartProducts.forEach(product => {
           if(product){
           dispatch(cartAddProduct(product));
         }
         })
   } 
   dispatch(cartfinishChecking());

  }, [dispatch])

  //si se modifica el store del cart, actualizar localStorage
  useEffect(() => {
    if(products){
      localStorage.setItem('cart', JSON.stringify(products));
    }
  }, [products])

//Chequeo logeo 
  useEffect(() => {
        
    dispatch(startChecking());

    if (uid){
      console.log("redirect");
      return <Redirect to='/'/>;

    }
  }, [dispatch, uid])

  //Loading page (mejorar)
  if (checking){
    return <div className="box-loader"><div className="loader"></div></div>;
  }

  return (
    
    <Router>
        <div>
            <Switch>
          {!uid &&
            <AuthRouter path="/auth"/> 
          }
          {uid && 
          <Route exact path="/orders" component={ OrderScreen }/>
          }
            <Route exact path="/cart" component={ CartScreen }/>
            <Route path="/" component={ ShopScreen }/>
            <Redirect to="/"/>
            </Switch>
        </div>
    </Router>
  );
}