import {combineReducers} from '@reduxjs/toolkit'
import UserData from '../Slices/UserData';
import FavoritesSlice from '../Slices/FavoritesSlice';
import CartSlice from '../Slices/CartSlice';

import TestReducer from './TestReducer'

const RootReducer = combineReducers({
    TestReducer: TestReducer,
    UserReducer: UserData,
    FavoritesReducer: FavoritesSlice,
    CartReducer: CartSlice
})

export default RootReducer;
