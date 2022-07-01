import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  header: {
    activity: 'Meeting',
    reason: '',
    destination: '',
    datestart: '',
    timestart: '',
    dateend: '',
    timeend: '',
  },
  details: [],
  totalcash: 0,
  file: {},
};

export const cashSlice = createSlice({
  name: 'cash',
  initialState,
  reducers: {
    addHeader: (state, action) => {
      let {
        activity,
        reason,
        destination,
        start_date,
        start_time,
        end_date,
        end_time,
      } = action.payload;
      state.header.activity = activity;
      state.header.reason = reason;
      state.header.destination = destination;
      state.header.datestart = start_date;
      state.header.timestart = start_time;
      state.header.dateend = end_date;
      state.header.timeend = end_date;
    },
    addDetails: (state, action) => {
      let {date, expense, currency, cash_request, remarks} = action.payload;
      state.details.push({
        id: Math.floor(Math.random() * 10),
        date: date,
        expense: expense,
        currency: currency,
        cash_request: cash_request,
        remasrks: remarks,
      });
      state.totalcash = _.sumBy(state.details, function (o) {
        return o.cash_request;
      });
    },
    delDetails: (state, action) => {
      _.remove(state.details, data => data.id === action.payload);
      state.totalcash = _.sumBy(state.details, function (o) {
        return parseInt(o.cash_request);
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {addHeader, addDetails, delDetails} = cashSlice.actions;

export default cashSlice.reducer;
