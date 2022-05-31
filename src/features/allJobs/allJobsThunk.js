import { logoutUser } from "../user/userSlice";
import customFetch from "../../utils/axios";
export const getAllJobsThunk = async (_, thunkAPI) => {
  let url = "/jobs";
  try {
    const response = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logout...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
