import { createContext, useState } from "react";

export const OrderingContext = createContext({
    orderedProducts: []
});

export const OrderingContextProvider = ({children}) => {

    const [barcitoId, setBarcitoId] = useState(null);
    const [orderedProducts, setOrderedProducts] = useState([]);

    const addProduct = (product) => {
        const productList = [...orderedProducts, product];
        setOrderedProducts(productList);
    }

    const updateQuantity = (productId) => {
        const productList = orderedProducts.map( (product) => {
            if( product.id === productId ){
                return {id: product.id, quantity: product.quantity += 1};
            }
            return product;
        });
        setOrderedProducts(productList);
    }

    const removeQuantity = (productId) => {
        const productList = orderedProducts.map( (product) => {
            if( product.id === productId ){
                return {id: product.id, quantity: product.quantity -= 1};
            }
            return product;
        });
        setOrderedProducts(productList);
    }

    const removeAllQuantity = (productId) => {
        const productList = orderedProducts.filter( (prod) => prod.id !== productId );
        setOrderedProducts(productList);
    }

    const clearProducts = () => {
        setOrderedProducts([]);
    }

    const isPresent = (productId) => {
        const found = orderedProducts.find( (prod) => prod.id === productId );
        return found;
    }

    return(
        <OrderingContext.Provider value={{
            barcitoId,
            setBarcitoId,
            orderedProducts,
            onAdd: addProduct,
            onUpdate: updateQuantity,
            onRemove: removeQuantity,
            onRemoveAll: removeAllQuantity,
            onClean: clearProducts,
            isPresent
        }}>
            {children}
        </OrderingContext.Provider>
    );
}