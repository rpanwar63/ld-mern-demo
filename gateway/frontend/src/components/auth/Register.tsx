import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { setCookie } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useIsLoggedInHook from "../../utils/isLoggedInHook";
import { apiCall } from "../../utils/apiCall";

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { isLoggedIn } = useIsLoggedInHook();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigateToHome = (force?: boolean) => {
    if (isLoggedIn || force) navigate("/", { replace: true });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await apiCall("post", `/user/register`, formValues);
    const formatedResult = result as {
      _id: string;
      username: string;
      email: string;
      token: string;
    };
    if (formatedResult?._id) {
      toast.success("Account created!");
      setCookie(true, formatedResult._id);
      navigateToHome(true);
    } else toast.error("User already exists!");
  };
  useEffect(() => {
    navigateToHome();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="login_container">
      <h2>
        <Link to="/">L&D MERN Demo</Link>
      </h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="username"
          onChange={handleChange}
          value={formValues.username}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={formValues.email}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={formValues.password}
        />
        <input
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          onChange={handleChange}
          value={formValues.confirmPassword}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/auth/login">Login!</Link>
      </p>
    </div>
  );
};
export default Register;
