import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import {
  handleChange,
  clearValue,
  createJob,
} from "../../features/job/jobSlice";
const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  useEffect(() => {
    // if(!isEditing){
    dispatch(handleChange({ name: "jobLocation", value: user.location }));
    // }
  }, []);
  return (
    <Wrapper>
      <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
      <div className="form-center">
        {/* Position */}
        <FormRow
          type="text"
          name="position"
          value={position}
          handleChange={handleJobInput}
        />
        {/* company */}
        <FormRow
          type="text"
          name="company"
          value={company}
          handleChange={handleJobInput}
        />
        <FormRow
          type="text"
          name="jobLocation"
          labelText="job location"
          value={jobLocation}
          handleChange={handleJobInput}
        />
        {/* Job status */}
        <FormRowSelect
          value={status}
          name="status"
          handleChange={handleJobInput}
          list={statusOptions}
        />
        {/* job type */}
        <FormRowSelect
          value={jobType}
          name="jobType"
          labelText="job types"
          handleChange={handleJobInput}
          list={jobTypeOptions}
        />
        {/* BTN CONTAINER */}
        <div className="btn-container">
          <button
            type="button"
            className="btn btn-block clear-btn"
            onClick={() => dispatch(clearValue())}
          >
            clear
          </button>
          <button
            type="submit"
            className="btn btn-block clear-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            submit
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddJob;
