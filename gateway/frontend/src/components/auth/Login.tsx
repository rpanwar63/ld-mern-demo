import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getCookie, setCookie } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigateToHome = (force?: boolean) => {
    if (getCookie("isLoggedIn") || force) navigate("/", { replace: true });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await apiCall("post", `/user/login`, formValues);
    const formatedResult = result as {
      _id: string;
      username: string;
      email: string;
      token: string;
    };
    if (formatedResult?._id) {
      setCookie(true, formatedResult._id);
      navigateToHome(true);
    } else toast.error("Invalid credentials!");
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
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/auth/register">Create!</Link>
      </p>
    </div>
  );
};
export default Login;
