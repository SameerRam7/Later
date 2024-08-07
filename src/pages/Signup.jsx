import React from 'react'
import Navbar from '../components/Navbar'
import SigninSignupComponent from '../components/SigninSignup'

const Signup = () => {
  return (
    <div className='bg-black'>
        <Navbar/>
        <div className='flex justify-center items-center w-auto h-screen'>
          <SigninSignupComponent/>
        </div>
    </div>
  )
}

export default Signup