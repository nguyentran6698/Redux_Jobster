import { loginUser, logoutUser } from "../user/userSlice";
import customFetch from "../../utils/axios";
import { clearValue } from "./jobSlice";
import { showLoading, getAllJobs } from "../allJobs/allJobsSlice";
const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  };
};
export const createJobThunk = async (url, job, thunkAPI) => {
  try {
    const response = await customFetch.post(url, job);
    thunkAPI.dispatch(clearValue());
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const updateJobThunk = async (url, { job, jobId }, thunkAPI) => {
  try {
    const response = await customFetch.patch(`${url}${jobId}`, job);
    thunkAPI.dispatch(clearValue());
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      thunkAPI.rejectWithValue("Unthorized! Logging Out...");
    }
    thunkAPI.rejectWithValue(error.reponse.data.msg);
  }
};
export const deleteJobThunk = async (url, jobID, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const response = await customFetch.delete(`/jobs/${jobID}`);
    thunkAPI.dispatch(getAllJobs());
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser);
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
