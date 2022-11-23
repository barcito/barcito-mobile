import { createContext, useState } from "react";

export const OrderingContext = createContext();

export const OrderingContextProvider = ({children}) => {
    const [barcito, setBarcito] = useState(null);
    const [orderedProducts, setOrderedProducts] = useState([]);

    const addProduct = (product) => {
        const productList = [...orderedProducts, product];
        setOrderedProducts(productList);
    }

    const updateQuantity = (productId) => {
        const productList = orderedProducts.map( (product) => {
            if( product.id === productId ){
                return { ...product, quantity: product.quantity += 1 };
            }
            return product;
        });
        setOrderedProducts(productList);
    }

    const removeQuantity = (productId) => {
        const productList = orderedProducts.map( (product) => {
            if( product.id === productId ){
                return { ...product, quantity: product.quantity -= 1 };
            }
            return product;
        });
        setOrderedProducts(productList);
    }

    const removeAllQuantity = (productId) => {
        const productList = orderedProducts.filter( (prod) => prod.id !== productId );
        setOrderedProducts(productList);
    }

    const clearOrder = () => {
        setOrderedProducts([]);
    }

    const isPresent = (productId) => {
        const found = orderedProducts.find( (prod) => prod.id === productId );
        return found;
    }

    return(
        <OrderingContext.Provider value={{
            barcito,
            setBarcito,
            orderedProducts,
            onAdd: addProduct,
            onUpdate: updateQuantity,
            onRemove: removeQuantity,
            onRemoveAll: removeAllQuantity,
            onClean: clearOrder,
            isPresent
        }}>
            {children}
        </OrderingContext.Provider>
    );
}