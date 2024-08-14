import React from 'react'
import Button from '../Button'
import { Card, Row } from 'antd'

function Cards({ income, expense, totalBalance,showExpenseModal, showIncomeModal}) {
  return (
    <div>
      <Row className='flex justify-between items-center flex-wrap w-11/12 my-4 mx-auto'>
        <Card className='m-8 text-white border-none min-w-80 min-h-[350px] p-4 font-Mons flex-1' style={{backgroundColor: "var(--card_bc)"}}>
            <h2 className='text-lg font-bold'>Current Balance</h2>
            <hr className='my-5 '/>
            <p className='text-lg font-medium my-6'>₹{totalBalance}</p>
            <Button text="Reset Balance" green={true}/>
        </Card>
        
        <Card /* title="Total Income" */ className='m-8 text-white border-none min-w-80 min-h-[350px] p-4 font-Mons flex-1' style={{backgroundColor: "var(--card_bc)"}}>
            <h2 className='text-lg font-bold'>Total Income</h2>
            <hr className='my-5 '/>
            <p className='text-lg font-medium my-6'>₹{income}</p>
            <Button text="Add Income" green={true} onClick={showIncomeModal}/>
        </Card>
        
        <Card /* title="Total Expenses" */ className='m-8 text-white border-none min-w-80 min-h-[350px] p-4 font-Mons flex-1' style={{backgroundColor: "var(--card_bc)"}}>
            <h2 className='text-lg font-bold'>Total Expense</h2>
            <hr className='my-5 '/>
            <p className='text-lg font-medium my-6'>₹{expense}</p>
            <Button text="Add Expense" green={true} onClick={showExpenseModal}/>
        </Card>
        
      </Row>
    </div>
  )
}

export default Cards
