import React, { useState, useEffect } from 'react';
import type { Expenses } from '../types/expense';
import { toast } from 'react-toastify'

type Props = {
  onAdd: (expense: Expenses) => void;
  onUpdate: (expense: Expenses) => void;
  onClose: () => void;
  editData?: Expenses | null;
};



export const AddExpense = ({ onAdd,
  onUpdate,
  onClose,
  editData }: Props) => {

  const [form, setForm] = useState<Expenses>({
    _id: '',
    title: '',
    amount: 0,
    category: '',
    date: '',
    modeOfTransfer: '',
    note: '',
  });
  const isEditMode = Boolean(editData?._id);

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        date: formatDate(editData.date)
      });
    } else {
      setForm({
        _id:'',
        title: '',
        amount: 0,
        category: '',
        date: '',
        modeOfTransfer: '',
        note: '',
      });
    }
  }, [editData]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value
    }));
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (isEditMode) {
      onUpdate(form);
    } else {
      onAdd(form);
    }

    onClose();
  };

  const validateForm = () => {
    console.log("Validation function")
    if (form.title.trim() == "") {
      toast.error("Title is required")
      return false
    }
    if (!form.amount || form.amount <= 0) {
      toast.error("Amount must be greater than 0")
      return false
    }
    if (!form.category) {
      toast.error("Category is required")
      return false
    }
    if (!form.date) {
      toast.error("Date is required")
      return false
    }
    if (!form.modeOfTransfer) {
      toast.error("Transaction mode is required")
      return false
    }
    return true
  }

  return (
    <>

      {/* Modal */}
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isEditMode ? "Edit Expense" : "Add Expense"}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <div className=" g-3">
                <div className="">
                  <label className="form-label">Expense Title <span className='required'>*</span></label>
                  <input
                    type="text"
                    className="form-control w-100"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label className="form-label  mt-1">Amount<span className='required'>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label className="form-label  mt-1">Category<span className='required'>*</span></label>
                  <select
                    className="form-select"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Groceries">Groceries</option>
                  </select>
                </div>

                <div className="">
                  <label className="form-label  mt-1">Date<span className='required'>*</span></label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label className="form-label  mt-1">Transaction Mode<span className='required'>*</span></label>
                  <select
                    className="form-select"
                    name="modeOfTransfer"
                    value={form.modeOfTransfer}
                    onChange={handleChange}
                  >
                    <option value="">Select Transaction Mode</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="netBanking">Net Banking</option>
                  </select>
                </div>

                <div className="">
                  <label className="form-label  mt-1">Note</label>
                  <input
                    type="text"
                    className="form-control"
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                {isEditMode ? "Update Expense" : "Add Expense"}
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};


