import { createContext, useReducer } from "react";
import OrderingReducer from "./OrderingReducer";

const initialState = {
    barcito: null,
    orderedProducts: []
};

export const OrderingContext = createContext(initialState);

export const OrderingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(OrderingReducer, initialState);

    const setBarcito = (barcito) => {
        dispatch({
            type: 'SET_BARCITO',
            payload: barcito
        })
    }

    const addProduct = (product) => {
        dispatch({
            type: 'ADD_PRODUCT',
            payload: product
        });
    }

    const updateQuantity = (productId) => {
        dispatch({
            type: 'UPDATE_PROD_QTY',
            payload: productId
        });
    }

    const removeQuantity = (productId) => {
        dispatch({
            type: 'REMOVE_PROD_QTY',
            payload: productId
        });
    }

    const removeAllQuantity = (productId) => {
        dispatch({
            type: 'REMOVE_PROD_ALL_QTY',
            payload: productId
        });
    }

    const clearOrder = () => {
        dispatch({
            type: 'CLEAR_ORDER'
        });
    }

    const isPresent = (productId) => {
        const found = state.orderedProducts.find( (prod) => prod.id === productId );
        return found;
    }

    const isOrdering = state.orderedProducts.length > 0;

    console.log(state.orderedProducts);

    return (
        <OrderingContext.Provider value={{
            barcito: state.barcito,
            orderedProducts: state.orderedProducts,
            setBarcito,
            onAdd: addProduct,
            onUpdate: updateQuantity,
            onRemove: removeQuantity,
            onRemoveAll: removeAllQuantity,
            onClean: clearOrder,
            isPresent,
            isOrdering
        }}>
            {children}
        </OrderingContext.Provider>
    );
}