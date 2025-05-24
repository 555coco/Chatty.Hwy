
import './App.css'
import Navbar from './components/Navbar'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'
import SignupPage from './page/SignupPage'
import ProfilePage from './page/ProfilePage'
import SettingPage from './page/SettingPage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore.js'

function App() {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
  const { theme } = useThemeStore()

  console.log({ authUser })
  console.log('onlineUsers:',onlineUsers)

  useEffect(() => {
    checkAuth()
  },[checkAuth])


  if(authUser && isCheckingAuth){
    return(
      <div className='items-center justify-center flex h-screen'>
        <Loader className="animate-spin size-10"></Loader>
      </div>
    )
  }
  return (
    <div data-theme={theme}>
      <Navbar />

        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignupPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} /> 
        </Routes>

        <Toaster />
    </div>
  )
}

export default App
