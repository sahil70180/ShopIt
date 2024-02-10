import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi"

export const store = configureStore({
    reducer : {
        // setting up reducer path (follow RTK documentation)
        [productApi.reducerPath] : productApi.reducer,
    },
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([productApi.middleware])

});