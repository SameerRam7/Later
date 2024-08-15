import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import searchImg from "../../assets/search_button.svg";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
const { Option } = Select;

function TransactionTable({ transactions, addTransaction, fetchTransactions }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    //JavaScript uses default sorting technique: quicksort or a variation of quicksort
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  function exportCSV(){
    var csv = unparse({
        fields: ["name", "type","tag","date","amount"],
        data: transactions,
    });
    const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importFromCSV(event){
    event.preventDefault();
    try {
        parse(event.target.files[0],{
            header: true,
            complete: async function (results) {
                //Now results.data is an array of objects representing your CSV rows
                for(const transaction of results.data){
                    //Write each transaction to Firebase, you can use the addTransaction function here
                    console.log("Transaction",transaction);
                    const newTransaction = {
                        ...transaction,
                        amount: parseFloat(transaction.amount),
                    };
                    await addTransaction(newTransaction,true);
                }
            },
        });
        toast.success("All Transaction Added");
        fetchTransactions();
        event.target.files = null;
    } catch (e) {
        toast.error(e.message)
    }
  }



  return (
    <div className="w-full py-0 px-8">
      <div className="flex justify-between items-center gap-4 mb-4">
        <div className="flex justify-start items-center gap-2 w-full rounded-r-lg py-0 px-2">
          <img
            src={searchImg}
            width="24"
            style={{ backgroundColor: "var(--black)" }}
          />
          <input
            className="bg-[#242323] text-white  rounded-full py-2 px-3 w-64 outline-none  font-medium hover:placeholder:text-[#808080] placeholder:hover:duration-200 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
          />
        </div>

        <Select
            
          className=" w-1/5 mr-1 flex items-center rounded-r-lg py-[2px] px-1  "
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      <div className="bg-[#242323] rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center w-full mb-3">
          <h2 className="text-white text-lg font-bold">My Transactions</h2>
          <div className="flex">
          <Radio.Group
            
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button style={{backgroundColor:"#21b84e",color:"white",fontSize:"13px",fontWeight:"bold",marginInline:"0.5px",borderRadius:"4px",border:"none"}} className="btn-green" value="">No Sort</Radio.Button>
            <Radio.Button style={{backgroundColor:"#21b84e",color:"white",fontSize:"13px",fontWeight:"bold",marginInline:"0.5px",borderRadius:"4px",border:"none"}} className="btn-green" value="date">Sort by Date</Radio.Button>
            <Radio.Button style={{backgroundColor:"#21b84e",color:"white",fontSize:"13px",fontWeight:"bold",marginInline:"0.5px",borderRadius:"4px",border:"none"}} className="btn-green" value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          </div>
          <div className="flex justify-center gap-3 w-[300px]">
            <button className="btn" onClick={exportCSV}>Export to CSV</button>
            <label for="file-csv" className="btn btn-green">
              Import from CSV
            </label>
            <input
              onChange={importFromCSV}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>
        <Table dataSource={sortedTransactions} columns={columns} className="font-semibold bg-white rounded-xl "/>;
      </div>
    </div>
  );
}

export default TransactionTable;
