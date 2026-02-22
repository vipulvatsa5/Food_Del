import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    //Backend URL from .env (Render backend)
    const url = import.meta.env.VITE_API_URL;

    // States
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    //Add to Cart
    const addToCart = async (itemId) => {

        // Update frontend cart instantly
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        // Update backend cart if logged in
        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Add to cart error:", error);
            }
        }
    };

    //Remove from Cart
    const removeFromCart = async (itemId) => {

        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Remove from cart error:", error);
            }
        }
    };

    //Calculate Total Amount
    const getTotalCartAmount = () => {

        let totalAmount = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {

                const itemInfo = food_list.find(
                    (product) => product._id === item
                );

                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };

    //Fetch Food List from Backend
    const fetchFoodList = async () => {

        try {

            const response = await axios.get(`${url}/api/food/list`);

            setFoodList(response.data.data);

        } catch (error) {

            console.error("Fetch food error:", error);
        }
    };

    // Load Cart Data from Backend
    const loadCartData = async (token) => {

        try {

            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { headers: { token } }
            );

            setCartItems(response.data.cartData);

        } catch (error) {

            console.error("Load cart error:", error);
        }
    };

    //Load data on startup
    useEffect(() => {

        async function loadData() {

            await fetchFoodList();

            const storedToken = localStorage.getItem("token");

            if (storedToken) {

                setToken(storedToken);

                await loadCartData(storedToken);
            }
        }

        loadData();

    }, []);

    // Context Value
    const contextValue = {

        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;