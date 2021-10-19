import { types } from "../types/types"

export const cartAddProduct = (product) => ({
    type: types.cartAddProduct,
    payload: product
})

export const cartRemoveProduct = (id) => ({
    type: types.cartRemoveProduct,
    payload: id
})

export const cartClear = () => ({
    type: types.cartClear
})

export const cartfinishChecking = () => ({
    type: types.cartfinishChecking
})