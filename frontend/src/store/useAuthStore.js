import { axiosInstance } from "../lib/axios.js"
import { create } from "zustand"
import { toast } from "react-hot-toast"
import { io } from "socket.io-client"
import { useChatStore } from "./useChatStore.js"




const BASE_URL = import.meta.env.NODE === "devlopment" ? "http://localhost:5001/api" : "/"

export const useAuthStore = create((set,get) => ({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
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
            set({authUser: res.data})
            get().connectSocket()
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

      get().connectSocket()
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
      useChatStore.getState().setSelectedUser(null)
      toast.success("Logged out successfully");
      get().disconnectSocket()
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

    connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    
    const socket = io(BASE_URL,{
      query:{
        userId:authUser._id
      }
    })
    socket.connect()
    
    set({socket:socket})

    socket.on("getOnlineUsers",(userIds) => {
      set({onlineUsers:userIds})
    })
  },

    disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

}))