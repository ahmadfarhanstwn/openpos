import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from './api/authApi';
import userReducer from '../redux/features/userSlice'
import productReducer from '../redux/features/productSlice'
import transactionReducer from '../redux/features/transactionSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import { productApi } from './api/productApi';
import { cashierApi } from './api/cashierApi';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [cashierApi.reducerPath]: cashierApi.reducer,
        userState: persistedUserReducer,
        productState: productReducer,
        transactionState: transactionReducer
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([authApi.middleware, productApi.middleware, cashierApi.middleware])
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store)