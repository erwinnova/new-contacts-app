import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: AsyncState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const globalLoadingSlice = createSlice({
  name: 'global-loading',
  initialState,
  reducers: {
    onLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {onLoading} = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
