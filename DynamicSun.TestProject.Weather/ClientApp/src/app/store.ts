import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { uploadSlice } from 'redux/upload/uploadSlice';
import { viewSlice } from 'redux/view/viewSlice';

export const store = configureStore({
  reducer: {
    uploadWether: uploadSlice.reducer,
    view: viewSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
