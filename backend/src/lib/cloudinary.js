import {v2 as cloudinary} from "cloudinary"//从 Cloudinary 库中导入 v2 版本，并将其重命名为 cloudinary。这是 Cloudinary 提供的主要 API，用于执行图像和视频的上传、处理等操作。

import {config} from "dotenv"

config()


//配置Cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export default cloudinary