import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import { toast } from "react-toastify";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    toast.success("Logged in successfully!");

    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error("Invalid email or password. Please try again.");
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    toast.success("Registered successfully!");
    navigate("/");
  } catch (error) {
    if (
      error.response &&
      error.response.data.message === "Email already exists"
    ) {
      toast.error("Email already exists. Please use a different email.");
    } else {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  }
};
