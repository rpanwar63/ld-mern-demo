import events from "events";
import axios from "axios";

const CommentNotification = new events.EventEmitter();

CommentNotification.on("notify", function (data) {
  axios.post(
    `http://localhost:8000/api/notify/create?user_id=${data.user_id}`,
    data
  );
});

export { CommentNotification };
