import api from "./api";

const resource = "sessions";

export const signIn = async (values) => {
  const response = await api.post(`${resource}/signin`, values);
  return response.data;
};
