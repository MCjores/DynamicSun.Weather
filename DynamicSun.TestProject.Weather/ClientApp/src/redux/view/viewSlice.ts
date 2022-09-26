import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import IWeatherData from 'models/Interface/IWeatherData';

interface Iinit {
  weatherDatas: Array<IWeatherData>;
  filter: {
    year: number | undefined;
    month: number | undefined;
  };
  status: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
}

const init: Iinit = {
  weatherDatas: [],
  filter: {
    year: undefined,
    month: undefined,
  },
  status: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
};

export const getDataAsync = createAsyncThunk(
  'getData',
  async () =>
    await axios
      .get('https://localhost:5001/WeatherArchive')
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject())
);

export const viewSlice = createSlice({
  initialState: init,
  name: 'viewSlice',
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    clearData(state) {
      state.weatherDatas = [];
    },
  },
  extraReducers(builder) {
    const setSuccess = (state: any) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    };
    const setLoading = (state: any) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    };
    const setError = (state: any) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    };

    builder.addCase(getDataAsync.pending, (state, action) => {
      setLoading(state.status);
    });
    builder.addCase(getDataAsync.fulfilled, (state, action) => {
      state.weatherDatas = action.payload;
      setSuccess(state.status);
    });
    builder.addCase(getDataAsync.rejected, (state, action) => {
      setError(state.status);
    });
  },
});

export const { setFilter, clearData } = viewSlice.actions;
