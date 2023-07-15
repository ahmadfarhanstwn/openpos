import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { BASE_URL } from "./constants";
import { RootState } from "../store";
import { logout } from "../features/userSlice";

export const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/`,
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).userState.token
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Accept', 'application/json')
        return headers
    }
})

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error?.status === 401) {
        api.dispatch(logout())
    }
    return result
}