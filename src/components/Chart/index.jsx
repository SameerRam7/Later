import React from 'react'
import { Line, Pie } from '@ant-design/charts';

function ChartComponent({sortedTransactions }) {
    const data = sortedTransactions.map((item) => {
        return {date: item.date, amount: item.amount}
    })

    let spendingData = sortedTransactions.filter((transaction) => {
        if(transaction.type == "expense") {
            return {tag: transaction.tag, amount: transaction.amount}
            }
        });
    
    let finalSpendings = spendingData.reduce((acc,obj) => {
        let key = obj.tag;
        if(!acc[key]) {
            acc[key] = {tag:obj.tag, amount: obj.amount}; //create a new object with the same properties
        } else {
            acc[key].amount += obj.amount;
        }
        return acc;
    },{});


    let newSpendings = [
        {tag:"food", amount: 0},
        {tag:"education", amount: 0},
        {tag:"office", amount: 0},
        {tag:"travel", amount: 0},
        {tag:"shopping", amount: 0},
    ];

    spendingData.forEach((item)=>{
        if(item.tag == "food") {
            newSpendings[0].amount += item.amount
        } else if(item.tag == "education") {
            newSpendings[1].amount += item.amount
        } else if(item.tag == "office") {
            newSpendings[2].amount += item.amount
        } else if(item.tag == "travel") {
            newSpendings[3].amount += item.amount
        } else {
            newSpendings[4].amount += item.amount
        }
    })

      const config = {
        data: data,
        width: 910,
        height: 430,
        autoFit: true,
        xField: 'date',
        yField: 'amount',
        /* line: {
            style: {
                fill: '#000', // Text color
                fontSize: 12, // Font size
                fontFamily: "Montserrat", // Font family
              },
            color: '#21b84e', // Line color
            strokeOpacity: 1, // Line opacity
            dash: [5, 5], // Dashed line style
          }, */
        point:{
            size:5,
            shape:"circle",
            fill: '#21b84e',
            stroke: '#36454F',
        }
        
      };

      const spendingConfig = {
        // data: Object.values(finalSpendings),
        data: newSpendings,
        width: 300,
        height: 400,
        angleField: "amount",
        colorField: "tag",
        
        
      };
      let chart;
      let pieChart;
  return (
    <div  className='bg-[#242323] flex justify-center items-center w-[95%] h-[83vh] mx-7 my-[113px] rounded-xl border-none' >
        <div  className='bg-white  justify-between w-[69%] h-[90%] p-4 rounded-lg m-3 ' /* style={{boxShadow: "var(--shadow)"}} */>
            <h2 className=' text-lg font-bold'>Your Analytics</h2>
        <Line  
        {...config} onReady={(chartInstance) => (chart = chartInstance)}/>
        </div>
        <div  className='bg-white justify-between w-[30%] h-[90%] p-4 rounded-lg m-3'>
            <h2 className=' text-lg font-bold'>Your Spendings</h2>
        <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)}/>
        </div>

    </div>
  )
}

export default ChartComponent