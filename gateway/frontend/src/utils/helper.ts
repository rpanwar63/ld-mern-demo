import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

export function getCookie(key: string) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function setCookie(isLoggedIn: boolean, _id: string) {
  document.cookie = "isLoggedIn=" + isLoggedIn + ";same-site=strict";
  document.cookie = "userId=" + _id + ";same-site=strict";
}

export function resetCookie() {
  document.cookie =
    "isLoggedIn=value; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  document.cookie =
    "userId=value; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

export function formatDate(date: string) {
  return `${formatDistanceToNow(date)} ago`;
}
