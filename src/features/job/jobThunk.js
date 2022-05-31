import { loginUser, logoutUser } from "../user/userSlice";
import customFetch from "../../utils/axios";
import { clearValue } from "./jobSlice";

export const createJobThunk = async (url, job, thunkAPI) => {
  try {
    const response = await customFetch.post(url, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
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
export const updateJobThunk = async (url, job, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().user.user.token;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(loginUser());
    }
  }
};
