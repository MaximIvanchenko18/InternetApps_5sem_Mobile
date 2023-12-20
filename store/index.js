import { configureStore } from '@reduxjs/toolkit';
import { cargoReducer } from './cargoSlice';

export const store = configureStore({ reducer: { cargo: cargoReducer } });