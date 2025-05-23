import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        console.log('Token:',token)
        if(!token){
            return res.status(401).json({message:"Unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Unauthorized - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        req.user = user

        next()


    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body
        const userID = req.user._id

        if(!profilePic){
            return res.status(400).json({message:"Profile Pic is required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userID,{profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log('error in update profile',error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const checkAuth = async (req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log(error)
    }
}