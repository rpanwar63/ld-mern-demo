import axios from "axios";

export async function apiCall(
  method: "get" | "post" | "put" | "delete",
  path: string,
  data: unknown
) {
  const result = axios[method](
    `${process.env.REACT_APP_BASE_URL}${path}`,
    data as any,
    {
      withCredentials: true,
    }
  )
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.message;
    });
  return result;
}
