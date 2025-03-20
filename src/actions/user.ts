import axios from "axios";
import { signOut } from "next-auth/react";

export const logoutUser = async () => {
  try {
    await signOut();
    return { data: "User logged out successful" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const deleteUser = async () => {
  try {
    const response = await axios.delete("/api/user");
    await signOut();
    return { data: response.data.message };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
