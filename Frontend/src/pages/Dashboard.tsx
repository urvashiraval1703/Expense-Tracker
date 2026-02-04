import React, { useEffect, useState } from 'react'
import "../App.css"
import { Navbar } from '../components/Navbar'
import { SummaryCard } from '../components/SummaryCard'
import { FaChartPie, FaMoneyBillWave, FaCalendarAlt, FaUsers, FaShoppingCart, FaWallet } from "react-icons/fa";
import { ExpenseTable } from '../components/ExpenseTable';
import { getLast7DaysRange } from '../utils/dateRanges';
import { getExpensesByRange } from '../service/expenseService';
import { toast } from 'react-toastify';
import { Piechart } from '../components/Piechart';
import { DonoughtChart } from '../components/donoughtChart'
import { MdCategory, MdQrCodeScanner, MdAccountBalance, MdAttachMoney } from "react-icons/md";


export const Dashboard = () => {

  const [expenses, setExpenses] = useState([])

  useEffect(() => {

    const fetchLatestExpense = async () => {
      const { startDate, endDate } = getLast7DaysRange()
      console.log(startDate, endDate)

      try {
        const response = await getExpensesByRange(startDate, endDate)
        console.log(response)
        const data = response.data.expenses
        console.log(data)
        setExpenses(data)


      } catch (error: any) {
        console.log(error)
        if (error.response) {
          toast.error(error.response.data.message);
        } else if (error.request) {
          toast.error("Server not responding");
        } else {
          toast.error("Something went wrong");
        }
      }
    }

    fetchLatestExpense()
  }, [])

  const groupedExpenses = expenses.reduce((acc: Record<string, number>, curr: any) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const labels = Object.keys(groupedExpenses);
  const values = Object.values(groupedExpenses);

  return (
    <div>
      <Navbar />
      <div className="mx-4 mt-4">
        <h4 className="mb-3">Dashboard</h4>

        <div className="row mt-1">
          {/* <SummaryCard
            title="Total Budget"
            amount="20,000"
            icon={<FaWallet />}
            bgColor="#4CAF50"
          /> */}

          <SummaryCard
            title="Total Expense"
            amount="9,950"
            icon={<FaMoneyBillWave />}
            bgColor="#6C63FF"
          />

          <SummaryCard
            title="This Month Expense"
            amount="3,500"
            icon={<FaCalendarAlt />}
            bgColor="#3498DB"
            extra="↑ 15%"
          />

          <SummaryCard
            title="Top Category"
            amount="Food"
            icon={<MdCategory />}
            bgColor="#2ECC71"
          />
        </div>
      </div>

      <div className='d-flex align-items-stretch gap-3 mx-4'>
        {/* Recent Expense table */}
        <div className='col-md-6 col-sm-12 dashboard-box'>
          <ExpenseTable
            heading='Recent Expenses (Last 7 days)'
            expenses={expenses}
          />
        </div>

        {/* Recent Expense chart */}
        <div className='col-md-6 col-sm-12 '>
          <Piechart labels={labels}
            values={values} />
        </div>
      </div>

      <div className="mx-3 mx-md-4 mt-4">
        <div className="card shadow-lg border-2 dashboard-box payment-summary mb-4">

          <h5 className="p-3 mb-0">Payment Summary</h5>

          <div className="row g-4 px-3 pb-4 align-items-stretch">

            {/* DONUT CHART */}
            <div className="col-12 col-md-7">
              <div className="h-100">
                <DonoughtChart values={values} />
              </div>
            </div>

            {/* PAYMENT MODE CARDS */}
            <div className="col-12 col-md-5">
              <div className="payment-cards ">

                <SummaryCard
                  title="UPI"
                  amount="5,000"
                  icon={<MdQrCodeScanner />}
                  bgColor="#63aeff"
                />

                <SummaryCard
                  title="Net Banking"
                  amount="2,000"
                  icon={<MdAccountBalance />}
                  bgColor="#da5837"
                />

                <SummaryCard
                  title="Cash"
                  amount="1,500"
                  icon={<FaMoneyBillWave />}
                  bgColor="#52c966"
                />

              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}


