import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react"


// create a auth api that will contains all the endopints related to authentication
export const authApi = createApi({
    reducerPath : 'authApi',
    baseQuery : fetchBaseQuery({baseUrl : "/api/v1"}),
    endpoints : (buidler) => ({
        // Endpoint 1 : Login
        login : buidler.mutation({
            query(body) {
                return {
                    url : "/login",
                    method : "POST",
                    body,
                }
            }
        })        
    })
})


export const { useLoginMutation } = authApi;