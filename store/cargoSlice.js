import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cargos: [],
    cargo: undefined,
    searchText: undefined,
    lowPrice: undefined,
    highPrice: undefined,
};

export const cargoSlice = createSlice({
    name: 'cargo',
    initialState,
    reducers: {
        setCargos: (state, { payload }) => {
            console.log('setCargos');
            state.cargos = payload;
        },
        setCargo: (state, { payload }) => {
            console.log('setCargo', payload);
            state.cargo = payload;
        },
        setSearch: (state, { payload }) => {
            state.searchText = payload
        },
        setLowPrice: (state, { payload }) => {
            state.searchLowPrice = payload
        },
        setHighPrice: (state, { payload }) => {
            state.searchHighPrice = payload
        },
        resetCargo: (state) => {
            console.log('resetCargo');
            state.cargo = undefined;
        },
    },
});

export const cargoReducer = cargoSlice.reducer;

export const { setCargos, setCargo, setSearch, setLowPrice, setHighPrice, resetCargo } = cargoSlice.actions;