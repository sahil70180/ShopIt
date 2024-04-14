import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const orderApi = createApi({
    reducerPath : "orderApi",
    baseQuery : fetchBaseQuery({baseUrl : "/api/v1"}),
    tagTypes : ["Order"],
    endpoints : (builder) => ({
        createNewOrder : builder.mutation({
            query(body) {
                return {
                    url : "/orders/new",
                    method : "POST",
                    body,
                };
            },
        }),
        myOders : builder.query({
            query :() => `/me/orders`,
            providesTags : ["Order"]
        }),
        orderDetails : builder.query({
            query :(id) => `/orders/${id}`,
            providesTags : ["Order"]
        }),
        stripeCheckoutSession : builder.mutation({
            query(body)  {
                return {
                    url : "/payment/checkout_session",
                    method : "POST",
                    body,
                };
            },
        }),
        getSalesData : builder.query({
            query : ({startDate, endDate}) => `/admin/get_sales?startDate=${startDate}&endDate=${endDate}`
        }),
        getAdminOrders :  builder.query({
            query : () =>  `/admin/orders`,
            providesTags : ["Order"]
        }),
        updateOrder : builder.mutation({
            query({id , body}) {
                return {
                    url : `/admin/orders/${id}`,
                    method : "PUT",
                    body,
                };
            },
            invalidatesTags : ["Order"]
        }),
        deleteOrder : builder.mutation({
            query(id) {
                return {
                    url : `/admin/orders/${id}`,
                    method : "DELETE",
                };
            },
            invalidatesTags : ["Order"]
        })
    }),
});

export const { useCreateNewOrderMutation, useStripeCheckoutSessionMutation, useMyOdersQuery, useOrderDetailsQuery, useLazyGetSalesDataQuery, useGetAdminOrdersQuery, useUpdateOrderMutation, useDeleteOrderMutation } = orderApi;