import express from "express";

import {deleteExpense,updateExpense,getAllExpenses,addExpense,getFilteredExpense} from "../controllers/expenseController.js"
import {authMiddleware} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/addExpense",authMiddleware,addExpense)
router.get("/getExpense",authMiddleware,getAllExpenses)
router.put("/updateExpense/:id",authMiddleware,updateExpense)
router.delete("/deleteExpense/:id",authMiddleware,deleteExpense)
router.post("/getExpenseByRange",authMiddleware,getFilteredExpense)

export default router;