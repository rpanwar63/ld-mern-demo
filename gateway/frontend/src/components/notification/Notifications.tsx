import { useEffect, useState } from "react";
import Header from "../header/Header";
import { apiCall } from "../../utils/apiCall";
import useIsLoggedInHook from "../../utils/isLoggedInHook";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { NotificationType } from "../../types/Notifications";
import { formatDate } from "../../utils/helper";

const Notifications = () => {
  const { myId } = useIsLoggedInHook();
  const [data, setData] = useState<NotificationType[]>([]);

  const fetchData = async () => {
    const result = await apiCall("post", `/notify?user_id=${myId}`, null);
    const formatedResult = result as {
      notifications: NotificationType[];
    };
    if (formatedResult?.notifications) {
      setData(formatedResult.notifications);
    } else toast.error("Something went wrong!");
  };
  const handleRemove = async (notification: NotificationType) => {
    const result = await apiCall(
      "post",
      `/notify/remove?user_id=${myId}`,
      notification
    );
    const formatedResult = result as {
      notifications: NotificationType[];
    };
    if (formatedResult?.notifications) {
      setData(formatedResult.notifications);
      toast.success("Removed successfully!");
    } else toast.error("Something went wrong!");
  };

  useEffect(() => {
    if (myId) fetchData();
  }, [myId]);

  return (
    <>
      <Header />
      <div className="notification_container">
        {data.map(notification => (
          <div className="wrapper">
            <Link to={`/post/${notification.post_id}`}>
              <div className="notification">
                <p>{notification.content}</p>
                <p>{formatDate(notification.date)}</p>
              </div>
            </Link>
            <button onClick={() => handleRemove(notification)}>+</button>
          </div>
        ))}
      </div>
    </>
  );
};
export default Notifications;
