import { useEffect, useState } from "react";
import { getCookie } from "./helper";

const useIsLoggedInHook = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myId, setMyId] = useState("");
  useEffect(() => {
    let userToken = getCookie("isLoggedIn");
    let myId = getCookie("userId");
    if (myId) setMyId(myId);
    if (userToken) setIsLoggedIn(true);
  }, []);
  return { isLoggedIn, myId };
};
export default useIsLoggedInHook;
