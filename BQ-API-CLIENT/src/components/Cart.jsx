import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

export const AddProduct = ({ name, price }) => {
    const [cart, setCart] = useContext(CartContext);

    const findProduct = () => {
        setCart((currItems) => {
            const itemsFound = currItems.find((item) => item.name === name);
            if (itemsFound) {
                return currItems.map((item) =>
                    item.name === name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...currItems, { id, quantity: 1, price }];
            }
        });
    };

    return findProduct;
};
