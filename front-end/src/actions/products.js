import { fetchWithoutToken } from '../helpers/fetch';
import {types} from '../types/types';

export const startGetProducts = (currentPage=1, orderBy) => {

    return async (dispatch) => {

        if(!orderBy){
            orderBy="name"
        }

        if (currentPage<=0){
            currentPage=1
        }
        const pageSize = 8;
        const res = await fetchWithoutToken(`products/?currentPage=${currentPage}&pageSize=${pageSize}&orderBy=${orderBy}`);
        const data = await res.json();
        dispatch(getProducts(data.products, currentPage, data.totalPages));
    }

}

export const getProducts = (products, currentPage, totalPages) => ({

    type: types.productsAll,
    payload: {products, currentPage, totalPages}

})

export const productSetActive = (product) => ({
    type: types.productSetActive,
    payload: product
})

export const productRemoveActive = () => ({
    type: types.productRemoveActive
})
