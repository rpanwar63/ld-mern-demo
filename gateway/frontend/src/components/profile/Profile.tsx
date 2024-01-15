import { useNavigate } from "react-router-dom";
import { getCookie, resetCookie } from "../../utils/helper";
import Header from "../header/Header";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { User } from "../../types/User";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";

const Profile = () => {
  const [profileData, setProfileData] = useState<User>({
    _id: "",
    username: "",
    email: "",
  });
  const navigate = useNavigate();

  const logout = async () => {
    await apiCall("post", "/user/logout", null);
    resetCookie();
    navigate("/");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const updateData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await apiCall("put", "/user", profileData);
    const formatedResult = result as User;
    if (formatedResult._id) toast.success("Profile updated succesfully!");
    else toast.error("Something went wrong!");
  };
  const fetchProfile = async () => {
    const result = await apiCall("post", "/user", null);
    const formatedResult = result as User;
    if (formatedResult._id) setProfileData(formatedResult);
    else toast.error("Something went wrong!");
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    let isLoggedIn = getCookie("isLoggedIn");
    if (!isLoggedIn) navigate("/auth/login", { replace: true });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <section className="profile_container">
        <form onSubmit={updateData}>
          <input
            name="username"
            type="text"
            placeholder="name..."
            required
            value={profileData?.username}
            onChange={handleChange}
          />
          <input
            name="email"
            type="text"
            placeholder="email..."
            required
            value={profileData?.email}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
        <button className="logout_button" onClick={logout}>
          Logout
        </button>
      </section>
    </>
  );
};
export default Profile;
