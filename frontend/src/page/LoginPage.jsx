import { Eye, EyeOff, Loader, Lock, Mail, MessageSquare } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'

const LoginPage = () => {

  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const [showPassword, setShowPassword] = useState(false)

  const {isLoggingin, login} = useAuthStore()

    
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log('FormData',formData)
    login(formData)
  }//犯错：参数没有传e导致按下按钮表单自动上传 页面刷新

  return (
    <div className='grid lg:grid-cols-2 min-h-screen bg-primary/50 text-primary-content'>
      {/*left side */}
      <div className='flex flex-col items-center justify-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/**Logo */}
          <div className='text-center mb-8'>
            <div className='items-center flex flex-col'>
              <div className='w-12 h-12 rounded-2xl flex items-center justify-center transition-colors bg-accent'>
                <MessageSquare className='w-6 h-6 '></MessageSquare>
              </div>
              <h1 className='font-bold text-2xl'>welcome back</h1>
              <p className=''>Sign in your account</p>
            </div>
          </div>
          {/**form */}
          <form onSubmit={handleSubmit} className='space-y-6 mb-0'>
            <div>
              <label>
                <span>Eamil</span>
              </label>
              <div className='relative'>
                <div className='absolute flex justify-center items-center pointer-events-none'>
                  <Mail className='ml-2 mt-0.5'></Mail>
                </div>
                <input type='email'
                       className='w-full pl-10 border-black border-2 rounded-2xl'
                       placeholder='you@email.com'
                       value={formData.email}
                       onChange={(e) => setFormData({...formData,email:e.target.value}) } />
              </div>
            </div>
            <div>
              <label>
                <span>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute flex justify-center items-center pointer-events-none'>
                  <Lock className='ml-2 mt-0.5'></Lock>
                </div>
                <input type={showPassword ? "text" : "password"}
                       className='w-full pl-10 border-black border-2 rounded-2xl'
                       placeholder='your password'
                       value={formData.password}
                       onChange={(e) => setFormData({...formData,password:e.target.value}) } />
                 <button type='button'
                         className='absolute right-0'
                         onClick={()=>{setShowPassword(!showPassword)}}>
                    { !showPassword ? (<Eye className='mr-3'/>) : <EyeOff className='mr-3 '/>}
                  </button>      
              </div>
            </div>
            <button type='submit'
                    className='ml-25 w-1/2 items-center justify-center border-black border-2 rounded-2xl btn'
                    disabled={isLoggingin}>
                {isLoggingin ? (
                  <>
                    <Loader2>Loading</Loader2>
                  </>
                ) : "Sign In"}
            </button>
          </form>
          <div className='text-right pr-25 '>
              <p className='right-0'>Haven't have account
                <Link to="/signup" className='ml-2 underline bg-primary'>Create account</Link>
              </p>
          </div>
        </div>
      </div>

      <AuthImagePattern title={"Welcom Back"} subTitle={"Sign in to continue your conversation and catch your messages"}></AuthImagePattern>
    </div>
  )
}

export default LoginPage
