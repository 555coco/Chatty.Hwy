import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id: {$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filteredUser)
    } catch (error) { 
        console.log('Error in getUserForSideBar',error.message)
        res.status(500).json({error:"Internal Server error"})
    }
}

export const getMessages = async (req,res) => {
    try {
        const { id:userToChatId } = req.params
        const myId = req.user._id
        const message = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(message)

    } catch (error) {
        console.log('Error in getMessage Controllers',error.message)
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

export const sendMessage = async (req,res) =>{
    try {
        const { text,image } = req.body
        const { id:receiverId } =  req.params
        const senderId = req.user._id

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl= uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        })

        await newMessage.save()

        //TODO 
        const receiverSocketId = getReceiverSocketId(receiverId)
        console.log('receiverSocketId:',receiverSocketId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log('Internal sever wrong',error)
        res.status(500).json({ error: "Internal server wrong"})
    }
}