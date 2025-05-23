import { axiosInstance } from "../lib/axios.js"
import { create } from "zustand"
import { toast } from "react-hot-toast"



const BASE_URL = 'http://localhost:5001'

export const useAuthStore = create((set,get) => ({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    //在 checkAuth 函数执行时，设置为 true，当身份检查完成（无论成功与否）后设置为 false。
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    
    /*发送 GET 请求到 /auth/check 路由，检查用户是否已登录。
如果请求成功，更新 authUser 为返回的数据（即用户信息）。
如果请求失败，打印错误并将 authUser 设置为 null。
最后，无论请求成功与否，都将 isCheckingAuth 设置为 false，表示身份检查已完成。 */
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check",{withCredentials:true})
            console.log("response res:",res)
            set({authUser: res.data})
        } catch (error) {
            console.log('Error in checkAuth',error)
            set({authUser:null})
        } finally{
            set({isCheckingAuth:false})
        }
    },


    signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");


    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.post("/auth/update-profile", data,{withCredentials:true});
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

}))