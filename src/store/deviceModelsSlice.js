import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REQUEST_DEVICE_ENDPOINTS } from "../components/compliance/RequestDevice/ApiEndpoints";

// Get the base URL from service utils (same pattern as services.js)
const ELOG_API_GATEWAY_URL = import.meta.env.VITE_ELOG_API_GATEWAY_URL || "";

const axiosConfig = {
  withCredentials: true,
  responseType: "json",
  validateStatus: function (status) {
    return status < 500;
  },
};

const commonHeaders = {
  "X-CSRF-TOKEN": "",
  "content-type": "application/json",
};

/**
 * Async thunk to fetch device models from API
 * Cached in Redux to avoid redundant network calls
 */
export const fetchDeviceModels = createAsyncThunk(
  "deviceModels/fetchDeviceModels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ELOG_API_GATEWAY_URL}${REQUEST_DEVICE_ENDPOINTS.GET_DEVICE_MODELS}`,
        {
          ...axiosConfig,
          headers: {
            ...commonHeaders,
          },
        }
      );
      
      const { status, data } = response;
      
      if (status === 200) {
        const { body } = data || {};
        const { data: modelData = [] } = body || {};
        
        // Transform data to dropdown format
        return modelData.map((item) => {
          const { model_name } = item;
          return {
            label: model_name,
            value: model_name,
          };
        });
      }
      
      return rejectWithValue("Failed to fetch device models");
    } catch (error) {
      console.error("Failed to fetch device models:", error);
      return rejectWithValue(error.message || "Failed to fetch device models");
    }
  }
);

const initialState = {
  models: [],
  isLoading: false,
  error: null,
  lastFetched: null,
};

const deviceModelsSlice = createSlice({
  name: "deviceModels",
  initialState,
  reducers: {
    clearDeviceModels: (state) => {
      state.models = [];
      state.error = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeviceModels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDeviceModels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.models = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchDeviceModels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDeviceModels } = deviceModelsSlice.actions;

export default deviceModelsSlice.reducer;
