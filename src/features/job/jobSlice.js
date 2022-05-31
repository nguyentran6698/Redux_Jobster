import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, updateJobThunk } from "./jobThunk";
const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["Full-Time", "Part-Time", "Remote", "Internship"],
  jobType: "full-time",
  statusOptions: ["Interview", "Declined", "Pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};
export const createJob = createAsyncThunk(
  "/job/createJob",
  async (job, thunkAPI) => {
    return createJobThunk("/jobs", job, thunkAPI);
  }
);
export const updateJob = createAsyncThunk(
  "/job/updateJob",
  async (job, thunkAPI) => {
    return updateJobThunk("/job", job, thunkAPI);
  }
);
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValue: (state) => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success("Job Created");
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});
export const { handleChange, clearValue } = jobSlice.actions;
export default jobSlice.reducer;
