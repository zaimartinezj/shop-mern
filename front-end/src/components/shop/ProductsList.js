import React from 'react'
import { ProductCard } from './ProductCard';
import './styleProducts.css';

export const ProductsList = ({products}) => {

    if(products.length===0){
        return <div className="box-loader"><div className="loader"></div></div>;
    }
    return (

        <div className="containerItems">
            {
                products.map(product=><ProductCard key={product._id} product={product} />)
            }
        </div>
       
    )
}
