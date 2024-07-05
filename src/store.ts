import {configureStore} from '@reduxjs/toolkit';
import contactReducer from './features/contact/contact.slice';
import globalLoadingReducer from './features/global-loading/global-loading.slice';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    globalLoading: globalLoadingReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
