import { createContext, useContext } from "react"

export const [cart, setCart] = useContext(createContext);

export const addProduct = ()  => {
setCart((currItems) => {
    const itemsFound =  currItems.find((item) => item.id === id);
    if (itemsFound) {
        return currItems.map((item) => {
            if (item.id === id) {
                return {...item, quantity: item.quantity +1};
            } else {
                return item;
            }
        });
    } else {
        console.log(currItems)
        return [...currItems, {id, quantity: 1, price}]
    }
});
};