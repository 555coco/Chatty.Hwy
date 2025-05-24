import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { useAuthStore } from "./useAuthStore"

export const useChatStore = create((set,get) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers: async () => {
        set({isUsersLoading:true})
        try{
            const res = await axiosInstance.get("/messages/users")
            set({users:res.data})
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isUsersLoading:false})
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get( `/messages/${userId}`)
            set({messages:res.data})
            console.log('get Messages',res)
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isMessagesLoading:false})
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get()

        const authUser = useAuthStore.getState().authUser

        const tempMessage = {
            ...messageData,
            _id:`temp-${Date.now()}`,
            senderId:authUser?._id,
            createdAt: new Date(),
            status: 'sending'
        }
        try {
            const res = axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
            set({messages:[...messages, tempMessage]})
            console.log('message again',messages)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    setSelectedUser: (selectedUser) => {set({selectedUser})},

    subscribeToMessages: () => {
        const {selectedUser} = get()
        if(!selectedUser) return

        const socket = useAuthStore.getState().socket

        socket.on("newMessage",(newMessage) => {
            console.log('newMessage:',newMessage)
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set({messages:[...get().messages,newMessage]})
            console.log('new message:',get().messages)
        })
    },

    unSubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket
        socket.off("newMessage")
    }

}))