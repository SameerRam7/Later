import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Cards from '../components/Cards'

import AddExpense from '../components/Modals/addExpense';
import AddIncome from '../components/Modals/addIncome';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../Firebase';
import moment from 'moment';
import { toast } from 'react-toastify';
import TransactionTable from '../components/TransactionsTable';

const Dashboard = () => {
  const [transactions,setTransactions] = useState([]);
  const [loading,setLoading] = useState(false);
  const [user]=useAuthState(auth)
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const [income,setIncome ] = useState(0);
  const [expense,setExpense ] = useState(0);
  const [totalBalance,setTotalBalance ] = useState(0);


  const showExpenseModal = () =>{
    setIsExpenseModalVisible(true);
  }
  
  const showIncomeModal = () =>{
    setIsIncomeModalVisible(true);
  }

  const handleExpenseCancel = () =>{
    setIsExpenseModalVisible(false);
  }
  
  const handleIncomeCancel = () =>{
    setIsIncomeModalVisible(false);
  }

  const onFinish = (values,type)=>{
    const newTransaction = {
      type: type,
      date: moment(values.data).format("YYYY-MM-DD"),
      amount:parseFloat(values.amount),
      tag:values.tag,
      name:values.name,
    };
    addTransaction(newTransaction);
  }

  async function addTransaction(transaction){
    //Add the doc
try {
  const docRef = await addDoc(
    collection(db,`users/${user.uid}/transactions`),
    transaction
  );
  console.log("Document written with ID: ",docRef.id)
  toast.success("Transaction Added!")
  let newArr = transactions;
  newArr.push(transaction);
  setTransactions(newArr)
  calculateBalance();
  
} catch(e) {
  console.error("Error adding document:",e);
    toast.error("Couldn't add transactions");
  
}
  }

  

  useEffect(() => {
    //Get all the docs from a collection
    fetchTransactions();
  },[])

  useEffect(() => {
    calculateBalance();
  }, [transactions])
  
  const calculateBalance = () =>{
    let incomeTotal =0;
    let expensesTotal = 0;

    transactions.forEach((transaction)=>{
      if(transaction.type === "income"){
        incomeTotal += transaction.amount;
      } else{
        expensesTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal)
  }

async function fetchTransactions() {
  setLoading(true);
  if(user){
    const q = query(collection(db,`users/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);
    let transactionsArray = [];
    querySnapshot.forEach((doc) => {
      //doc.data() is never undefined for query doc snapshots
      transactionsArray.push(doc.data());
    });
    setTransactions(transactionsArray);
    console.log("Transaction Array",transactionsArray)
    toast.success("Transactions Fetched!");

  }
  setLoading(false);
}

  return (
    <div /* style={{height:"100%"} }*/> 
      <Navbar/>
      {loading?<>
      <p>Loading....</p>
      </> :<>
      <Cards
      income={income}
      expense={expense}
      totalBalance={totalBalance}
      showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
      />
      
      <AddExpense
      isExpenseModalVisible={isExpenseModalVisible}
      handleExpenseCancel={handleExpenseCancel}
      onFinish={onFinish}
      />
      <AddIncome
      isIncomeModalVisible={isIncomeModalVisible}
      handleIncomeCancel={handleIncomeCancel}
      onFinish={onFinish}
      />

      <TransactionTable transactions={transactions}/>
      </>
}
      </div>
  )
}

export default Dashboard