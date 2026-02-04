import axios from "axios"
import { getCurrentUser } from "../utils/auth"
import type { Expenses } from '../types/expense'
import { toast } from "react-toastify"

export const addExpenseData = async (expense: Expenses) => {
    console.log(expense)
    const user = getCurrentUser()

    if (!user) {
        toast.error("User not authenticated")
    }
    return await axios.post("http://localhost:5000/expense/addExpense", expense, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`,
        },
    })
}

export const getAllExpenses = async () => {

    const user = getCurrentUser()
    console.log(user)
    if (!user) {
        toast.error("User not authenticated")
    }
    return await axios.get("http://localhost:5000/expense/getExpense", {
        headers: {
            Authorization: `Bearer ${user.accessToken}`,
        },
    })
}

export const deleteExpenseData = async (id: string) => {
    console.log(id)
    const user = getCurrentUser()
    console.log(user)
    if (!user) {
        toast.error("User not authenticated")
    }
    return await axios.delete(`http://localhost:5000/expense/deleteExpense/${id}`,
        {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        })
}

export const updateExpenseData = async (id: string, expense: Expenses) => {
    console.log(id)
    const user = getCurrentUser()
    console.log(user)
    if (!user) {
        toast.error("User not authenticated")
    }
    return await axios.put(`http://localhost:5000/expense/updateExpense/${id}`, expense,
        {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        })
}

export const getExpensesByRange = async (
    startDate: string,
    endDate: string
) => {
    const user = getCurrentUser()
    console.log(user)
    console.log(startDate,endDate)
    if (!user) {
        toast.error("User not authenticated")
    }

    return await axios.post(`http://localhost:5000/expense/getExpenseByRange`, { startDate, endDate },
        {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        })

};






