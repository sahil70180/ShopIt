import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { setUser, setIsAuthenticated, setloading } from "../features/userSlice";

export const userApi = createApi({
    reducerPath : "userApi",
    baseQuery : fetchBaseQuery({baseUrl : "/api/v1"}),
    tagTypes : ["User",],
    endpoints : (builder) => ({
        getMe : builder.query({
            query : () => `/me`,
            transformResponse : (result) => result.user,
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setUser(data));
                    dispatch(setIsAuthenticated(true));
                    dispatch(setloading(false));
                } catch (error) {
                    dispatch(setloading(false));
                    console.log(error);
                }
            },
            providesTags : ["User"],
        }),
        updateProfile : builder.mutation({
            query(body) {
                return {
                    url : "/me/update",
                    method : "PUT",
                    body,
                }
            },
            invalidatesTags : ["User"],
        }),
        uploadAvatar : builder.mutation({
            query(body) {
                return {
                    url : "/me/upload_avatar",
                    method : "PUT",
                    body,
                }
            },
            invalidatesTags : ["User"]
        }),
        updatePassword : builder.mutation({
            query(body) {
                return {
                    url : "/password/update",
                    method : "PUT",
                    body,
                }
            },
        }),
        forgotPassword : builder.mutation({
            query(body) {
                return {
                    url : "/password/forgot",
                    method : "POST",
                    body,
                }
            },
        }),
        resetPassword : builder.mutation({
            query({token, body}) {
                return {
                    url : `/password/reset/${token}`,
                    method : "PUT",
                    body,
                }
            },
        }),
        getAdminUsers : builder.query({
            query : () => `/admin/users`,
            providesTags : ["User"]
        }),
        getUserDetails : builder.query({
            query : (id) => `/admin/users/${id}`,
            providesTags : ["User"]
        }),
        updateUserDetails : builder.mutation({
            query({id, body}){
                return {
                    url : `/admin/users/${id}`,
                    method : "PUT",
                    body
                }
            },
            invalidatesTags : ["User"]
        }),
        deleteUser : builder.mutation({
            query(id) {
                return {
                    url : `/admin/users/${id}`,
                    method : "DELETE"
                }
            },
            invalidatesTags : ["User"]
        })
    }),
});

export const {useGetMeQuery, useUpdateProfileMutation, useUploadAvatarMutation, useUpdatePasswordMutation, useForgotPasswordMutation, useResetPasswordMutation, useGetAdminUsersQuery, useGetUserDetailsQuery, useUpdateUserDetailsMutation, useDeleteUserMutation} = userApi;