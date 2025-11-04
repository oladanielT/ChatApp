import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { Navigate } from "react-router";

export const userAuthStore = create((set) => ({
  userAuth: null,
  isCheckAuth: true,
  isSigningUp: false,
  isLoggedIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ userAuth: res.data });
    } catch (error) {
      console.log("Error in checkAuth ", error);
      set({ userAuth: null });
    } finally {
      set({ isCheckAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ userAuth: res.data });
      toast.success("Account created successfully");
      Navigate("/");
    } catch (error) {
      toast.error("Error signing up user ");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggedIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ userAuth: res.data });
      toast.success("Logged in successfully");
      Navigate("/");
    } catch (error) {
      toast.error(error);
    } finally {
      set({ isLoggedIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("You have successfully logged out");
      Navigate("/login");
    } catch (error) {
      console.log("Error logging out user ", error);
    }
  },
}));
