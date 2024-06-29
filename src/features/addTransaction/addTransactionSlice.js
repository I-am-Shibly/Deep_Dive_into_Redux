import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNewTransaction } from './addTransactionApi';
import { getAllTransactions } from '../allTransactions/allTransactionsSlice';

export const addTransaction = createAsyncThunk(
  'addTransaction',
  async (data, { dispatch }) => {
    await addNewTransaction(data);
    dispatch(getAllTransactions());
  }
);

const initialState = {
  loading: false,
  isError: false,
  error: '',
};

const addTransactionSlice = createSlice({
  name: 'addTransaction',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default addTransactionSlice.reducer;
