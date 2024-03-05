import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi"
import { authApi } from "./api/authapi";
import { userApi } from "./api/userApi";

import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice"


export const store = configureStore({
    reducer : {
        // setting up reducer path (follow RTK documentation)
        auth : userReducer,
        cart : cartReducer,
        [productApi.reducerPath] : productApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
        [userApi.reducerPath] : userApi.reducer,

    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([productApi.middleware, authApi.middleware, userApi.middleware]),
});