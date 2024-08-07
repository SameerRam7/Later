import React from 'react'

function Input({ label,state,setState,placeholder }) {
  return (
    <div className=''>
      <p className='capitalize mt-5 text-base font-medium'>{label}</p>
      <input 
      value={state}
      placeholder={placeholder} 
      onChange={(e)=>setState(e.target.value)} className='border-0 border-b-2 w-full px-1 py-0 text-base opacity-[0.8] focus:outline-none focus:opacity-[2] placeholder:text-gray-500 font-medium'/>
    </div>
  )
}

export default Input
