import React from 'react'
import transactionsImg from "../assets/transactions.svg"


function NoTransactions() {
  return (
    <div className='flex justify-center items-center w-full flex-col mb-8'>

    <img src={transactionsImg} className='w-[400px] m-16'/>

    <p className='text-center text-xl'>
      You Have No Transactions Currently
    </p>
  </div>
  )
}

export default NoTransactions



    
  


