export const types = {

    authCheckingFinish: '[auth] Checking login state',
    authLogin: '[auth] Login User',
    authLogout: '[auth] Logout User',
    
    productsAll: '[products] List all products',
    productsByID: '[products] List product by id',
    productsAllOrderByPrice: '[products] List all products order by price',
    productSetActive: '[products] Set Active Product',
    productRemoveActive: '[products] Remove Active Product',

    cartfinishChecking: '[cart] finishChecking',
    cartAddProduct: '[cart] Add Product to cart',
    cartRemoveProduct: '[cart] Remove Product to cart',
    cartClear: '[cart] Clear cart',

    orderFinishChecking: '[order] finish Checking order',
    orderStartChecking: '[order] start Checking order',

    orderNewCreate: '[order] New Order',
    orderListAll: '[order] Get Orders',
    orderDeleteOne: '[order] Delete Order' 
}