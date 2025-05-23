import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react'
 


const ProfilePage = () => {

  const {isUpdatingProfile , authUser, updateProfile } = useAuthStore()
  const [selcetedImg, setSelectedImg] = useState(null)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if(!file) return 

    if(file.size > 10*1024*1024){
      alert('文件大小不能超过10MB')
      return
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updateProfile({profilePic:base64Image})
    }

  }

  return (
    <div className='min-h-screen bg-primary/20 pt-20 text-black'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='rounded-xl p-6 space-y-8 border-2'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>
          {/**avatar */}
          <div className='flex flex-col items-center gap=4'>
            <div className='relative'>
              <img src={selcetedImg || authUser.profilePic || "/avatar.png"}
                   alt='Profile'
                   className='size-25 rounded-full object-cover border-4' />
              <label htmlFor='avatar-upload'
                     className={`absolute bottom-0 right-0 hover:scale-105 rounded-full cursor-pointer transition-all 
                     ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
                      <Camera className='w-5 h-5'></Camera>
                      <input type='file'
                             id='avatar-upload'
                             className='hidden'
                             accept='image/*'
                             onChange={handleImageUpload}
                             disabled={isUpdatingProfile} />
              </label>
            </div>
            <p className='text-sm mt-1'>Click the camara icon to updata your photo</p>
          </div>
          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-black-400 flex items-center gap-2'>
                <User className=''></User>
                Full Name
              </div>
              <p className='rounded-lg border-2 px-4 py-2.5 text-xl'>{authUser.fullName}</p>
            </div>
            <div className='space-y-1.5'>
              <div className='text-sm text-black flex items-center gap-2'>
                <Mail></Mail>
                Email Address
              </div>
              <div className='rounded-lg border-2 px-4 py-2.5 text-xl'>{authUser.email}</div>
            </div>
          </div>

          <div className='mt-6  bg-neutral rounded-xl p-6'>
            <h2 className='font-bold text-center'>Account Information:</h2>
            <div className='space-y-3 '>
              <div className='flex items-center justify-center py-2 border-b'>
                <span>Member Since:</span>
                <span className='ml-3'>{(authUser?.createdAt|| '').split("T")[0] || 'unknow'}</span>
              </div>
              <div className='flex items-center justify-center'>
                <span>Account Status: </span>
                <span className='ml-3 font-bold'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
