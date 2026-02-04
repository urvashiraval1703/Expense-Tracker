import { useEffect, useState } from 'react'
import { AddExpense } from '../components/AddExpense'
import { ExpenseTable } from '../components/ExpenseTable'
import { Navbar } from '../components/Navbar'
import type { Expenses } from '../types/expense'
import { toast } from 'react-toastify/unstyled'
import { addExpenseData, deleteExpenseData, getAllExpenses, updateExpenseData } from "../service/expenseService"

export const Expense = () => {

  const [expenses, setExpenses] = useState<Expenses[]>([])
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expenses | null>(null);


  useEffect(() => {
    fetchAllExpense()
  }, [])
  const fetchAllExpense = async () => {
    console.log("Fetch all expenses")
    try {
      const response = await getAllExpenses();
      console.log(response)
      setExpenses(response.data.data)
    }
    catch (error: any) {
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
  const addExpense = async (expense: Expenses) => {
    console.log(expenses)
    try {
      const response = await addExpenseData(expense)
      console.log(response.data.message)
      toast.success(response.data.message)
      fetchAllExpense()
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

  const deleteExpense = async (id: string) => {
    console.log(id)
    try {
      const response = await deleteExpenseData(id)
      console.log(response)
      toast.success(response.data.message)
      fetchAllExpense()
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

  const editExpense = (expenseData: Expenses) => {
    setSelectedExpense(expenseData);
    setShowAddModal(true);
  };

  const updateExpense = async (expense: Expenses) => {

    console.log(expense)
    const id = expense._id
    console.log(id)
    if (!expense._id) {
      toast.error("Expense ID is missing");
      return;
    }

    try {
      const response = await updateExpenseData(expense._id, expense)
      console.log(response)
      toast.success(response.data.message)
      fetchAllExpense()
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

  return (
    <>
      {/* BLUR THIS */}
      <div className={showAddModal ? 'blur-background' : ''}>
        <Navbar />

        <div className="m-4">
          <h3 className="mb-4 fw-semibold">Expenses</h3>

          <button
            className="btn btn-primary mb-3"
            onClick={() => {
              setSelectedExpense(null);
              setShowAddModal(true)
            }}
          >
            + Add Expense
          </button>

          <ExpenseTable
            heading = "List of Expenses"
            expenses={expenses}
            onDelete={deleteExpense}
            onEdit={editExpense}
          />
        </div>
      </div>

      {/* MODAL (OUTSIDE BLUR) */}
      {showAddModal && (
        <>
          <AddExpense
            onAdd={addExpense}
            onUpdate={updateExpense}
            editData={selectedExpense}
            onClose={() => setShowAddModal(false)}
          />
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>




  )
}
