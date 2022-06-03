import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, updateJobThunk, deleteJobThunk } from "./jobThunk";
const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
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
  async ({ job, jobId }, thunkAPI) => {
    return updateJobThunk("/jobs/", { job, jobId }, thunkAPI);
  }
);
export const deleteJob = createAsyncThunk(
  "/job/deleteJob",
  async (jobId, thunkAPI) => {
    return deleteJobThunk("/jobs/", jobId, thunkAPI);
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
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
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
    [updateJob.pending]: (state) => {
      state.isLoading = true;
    },
    [updateJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Modified...");
    },
    [updateJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});
export const { handleChange, clearValue, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
