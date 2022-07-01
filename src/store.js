import {configureStore} from '@reduxjs/toolkit';
import cashSlice from './reducer/cashSlice';

export const store = configureStore({
  reducer: {
    cash: cashSlice,
  },
});
