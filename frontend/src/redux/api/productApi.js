import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


// create a product api that will all the endopints related to product
export const productApi = createApi({
    reducerPath : 'productApi',
    baseQuery : fetchBaseQuery({baseUrl : "/api/v1"}),
    endpoints : (buidler) => ({
        getProducts : buidler.query({
            query : (params) => ({
                url : "/products"
            })
        })
    })
})

// getProducts is a endpoint name, and now we have to export it like a hook (RTK documentation)
// the reason for exporting hook is that we can use isLoading, iserro and all these varaibles directly 

export const  { useGetProductsQuery } = productApi;