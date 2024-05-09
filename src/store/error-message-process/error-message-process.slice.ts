import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ErrorMessageProcess } from '../../types/state';

const initialState: ErrorMessageProcess = {
  errorMessage: null,
};

export const errorMessageSlice = createSlice({
  name: NameSpace.Error,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      const { error } = action.payload;
      state.errorMessage = error;
    },
    removeError: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { setError, removeError } = errorMessageSlice.actions;
