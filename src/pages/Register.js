import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate, userNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ email, name, password }));
  };
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);
  return (
    <Wrapper className="full-page">
      <form action="" onSubmit={onSubmit} className="form">
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* Name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            handleChange={handleChange}
            labelText="Name"
            value={values.name}
          />
        )}
        {/* Name field */}
        <FormRow
          type="email"
          name="email"
          handleChange={handleChange}
          labelText="Email"
          value={values.email}
        />
        {/* Password field */}
        <FormRow
          type="password"
          name="password"
          handleChange={handleChange}
          labelText="Password"
          value={values.password}
        />
        <button className="btn btn-block" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            );
          }}
          className="btn btn-block btn-hipster"
        >
          {isLoading ? "loading" : "demo"}
        </button>
        <p>
          {values.isMember ? "Not a member yet ?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
