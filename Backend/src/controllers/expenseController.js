import Expense from "../models/expense.js";

/* ================= ADD EXPENSE ================= */
export const addExpense = async (req, res) => {
    try {
        const newExpense = new Expense({
            ...req.body,
            userId: req.user.id, // comes from verifyToken middleware
        });

        await newExpense.save();

        res.status(201).json({
            success: true,
            message: "Expense added successfully!",
            data: newExpense,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while adding expense",
        });
    }
};

/* ================= GET ALL EXPENSES ================= */
export const getAllExpenses = async (req, res) => {
    console.log("REQ BODY 👉", req.body);
    console.log("REQ USER 👉", req.user);
    try {
        const expenses = await Expense.find({
            userId: req.user.id,
        }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            data: expenses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while fetching expenses",
        });
    }
};

/* ================= GET EXPENSE OF DATE RANGE ================= */
export const getFilteredExpense = async (req, res) => {
    try {
        console.log(req)
        const { startDate, endDate } = req.body
        const  userId  = req.user.id

        console.log(startDate, endDate)
        console.log(userId)

        // Convert strings to Date objects
        // const start = new Date(startDate);
        // const end = new Date(endDate);

        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Start date and end date are required" });
        }

        if(startDate>endDate){
            return res.status(400).json({ message: "Start date must be less than end date" });
        }

        // Query expenses between these dates
        const expenses = await Expense.find({
            user: req.user._id,
            date: { $gte: startDate, $lte: endDate },
        }).sort({ date: -1 });

        res.status(200).json({ expenses });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while fetching expenses",
        });
    }
}

/* ================= UPDATE EXPENSE ================= */
export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: id, userId: req.user.id }, // 🔐 security check
            req.body,
            { new: true }
        );
        -
            res.status(200).json({
                success: true,
                message: "Expense updated successfully!",
                data: updatedExpense,
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while updating expense",
        });
    }
};

/* ================= DELETE EXPENSE ================= */
export const deleteExpense = async (req, res) => {
    console.log("Delete Expense")
    try {
        const { id } = req.params;

        await Expense.findOneAndDelete({
            _id: id,
            userId: req.user.id, // 🔐 only owner can delete
        });

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully!",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting expense",
        });
    }
};
