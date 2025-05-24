import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Eye, EyeOff, Lock, Mail, MessageSquare, User, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern.jsx'
import toast from 'react-hot-toast'




const SignupPage = () => {
  const [showpassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  })

  const {signup, isSigningUp} = useAuthStore()

   const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = validateForm()

    console.log('Form Data:',formData)

    if(success === true) {
      signup(formData)
    }
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2  bg-primary/50 text-primary-content'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl border-black bg-accent items-center justify-center bg-base-100/80 
              transition-clors'>
                  <MessageSquare className='size-6 ml-3 mt-3 text-primary'></MessageSquare>
              </div>
              <h1 className='text-2xl font-bold mt-2 text-primary-content'>Create Account</h1>
              <p className='text-primary-content'>Get started with your free account</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-6'>
          <div className=''>
            <label className=''>
              <span className=' font-midiem'>Full Name</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex item-center justify-center pointer-events-none'>
                <User className='size-5'></User>
              </div>
              <input 
                type='text'
                className='w-full pl-10 border-1 rounded-xl'
                placeholder=''
                value={formData.fullName}
                onChange={(e)=> setFormData({...formData, fullName:e.target.value})}
              />

            </div>
          </div>
          <div className='from-control'>
            <label className='label'>
              <span className='label-text font-medium '>Email</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-2 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className='size-5'></Mail>
              </div>
              <input 
                type="email"
                className='w-full pl-10 border-1 rounded-xl'
                placeholder='here'
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email:e.target.value})
                }} />
            </div>
          </div>
          <div className='form-control'>
            <label className='label'>
              <span>Password</span>
            </label>
            <div className='relative'>
                <div className='absolute inset-y-0 pl-3 flex pointer-events-none'>
                  <Lock></Lock>
                </div>
                <input 
                  type={showpassword?"text":"password"}
                  className='w-full rounded-xl border-1 input-boardered pl-10'
                  placeholder='******'
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({...formData,password: e.target.value})
                  }} />
                <button 
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showpassword)}>
                    {showpassword?(
                      <EyeOff></EyeOff>
                    ):<Eye></Eye>}
                </button>
            </div>
          </div>
          <button type='submit' className=' w-full mt-3 rounded-2xl border btn' disabled={isSigningUp}>
            {isSigningUp ? (
              <>
              <Loader2>Loading</Loader2>
              </>
            ):("Create Account")}
          </button>
        </form>
          <div>
            <p className='text ml-3 mt-3'>Already have an account
              <Link to={"/login"} className='ml-3 underline bg-primary'>login</Link>   
            </p>
          </div>
      </div>

      <AuthImagePattern
        title="Join our Community"
        subTitle="Connect with friends, share moments, and stay in touch with your loved ones" />    </div>
  )
}

export default SignupPage
