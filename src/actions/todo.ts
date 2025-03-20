import axios, { isAxiosError } from "axios";

export const deleteTodo = async (id: string) => {
  try {
    const response = await axios.delete(`/api/todo/${id}`);
    return { data: response.data.message };
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: error.response?.data.message };
    }
    return { error: "Something went wrong" };
  }
};

export const completeTodo = async (id: string) => {
  try {
    const response = await axios.patch(`/api/todo/complete/${id}`);
    return { data: response.data.message };
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: error.response?.data.message };
    }
    return { error: "Something went wrong" };
  }
};
