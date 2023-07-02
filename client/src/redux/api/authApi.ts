import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './constants'
import { ISignInResponse, ISignUpResponse } from './Types/userTypes'
import { logout, setToken, setUser } from '../features/userSlice'
import { SignUpInput } from '../../pages/SignUpPage'
import { SignInInput } from '../../pages/SignInPage'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/`,
        prepareHeaders: (headers, {getState}) => {
            headers.set('Accept', 'application/json')
            return headers
        }
    }),
    endpoints: (builder) => ({
        signUpUser: builder.mutation<ISignUpResponse, SignUpInput>({
            query(data) {
                return {
                    url: 'signup',
                    method: 'POST',
                    body: data
                }
            }
        }),
        signInUser: builder.mutation<ISignInResponse, SignInInput>({
            query(data) {
                return {
                    url: 'signin',
                    method: 'POST',
                    body: data
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data.user))
                    dispatch(setToken(data.authorization.token))
                } catch(err) {}
            }
        }),
        signOutUser: builder.mutation<void, void>({
            query() {
                return {
                    url: 'signout',
                    method: 'POST',
                    credentials: 'include'
                }
            },
            async onQueryStarted(arg, {dispatch}) {
                try {
                    dispatch(logout())
                } catch(err) {}
            },
        })
    })
})

export const {useSignInUserMutation, useSignUpUserMutation, useSignOutUserMutation} = authApi