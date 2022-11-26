const OrderingReducer = (state, action) => {
    switch(action.type){
        case 'SET_BARCITO':
            return {
                ...state,
                barcito: action.payload
            }
        case 'ADD_PRODUCT':
            return {
                ...state,
                orderedProducts: [...state.orderedProducts, action.payload]
            }
        case 'UPDATE_PROD_QTY':
            return {
                ...state,
                orderedProducts: state.orderedProducts.map( (product) => {
                    if( product.id === action.payload ){
                        return { ...product, quantity: product.quantity += 1 };
                    }
                    return product;
                })
            }
        case 'REMOVE_PROD_QTY':
            return {
                ...state,
                orderedProducts: state.orderedProducts.map( (product) => {
                    if( product.id === action.payload ){
                        return { ...product, quantity: product.quantity -= 1 };
                    }
                    return product;
                })
            }
        case 'REMOVE_PROD_ALL_QTY':
            return {
                ...state,
                orderedProducts: state.orderedProducts.filter( (prod) => prod.id !== action.payload )
            }
        case 'CLEAR_ORDER':
            return {
                ...state,
                orderedProducts: []
            }
        default:
            return state;
    }
}

export default OrderingReducer;