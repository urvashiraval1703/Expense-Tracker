import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { Expenses } from '../types/expense';
import "../App.css"


type Props = {
  heading: string;
  expenses: Expenses[];
  onDelete?: (id: string) => void;
  onEdit?: (expense: Expenses) => void;
};

export const ExpenseTable = ({
  heading,
  expenses,
  onDelete,
  onEdit,
}: Props) => {
  const showActions = onEdit || onDelete;

  return (
    <div className="card shadow-lg border-1 h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5>{heading}</h5>
        </div>

        <div className="expense-table">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Payment Mode</th>
                <th>Description</th>
                <th>Amount</th>
                {showActions && <th className="text-center">Actions</th>}
              </tr>
            </thead>

            <tbody className='table-body'>
              {expenses.length === 0 ? (
                <tr>
                  <td
                    colSpan={showActions ? 6 : 5}
                    className="text-center text-muted py-4"
                  >
                    No expenses available till now
                  </td>
                </tr>
              ) : (
                expenses.map((item) => (
                  <tr key={item._id}>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td className="fw-semibold">{item.category}</td>
                    <td>{item.modeOfTransfer}</td>
                    <td>{item.note}</td>
                    <td>₹ {item.amount}</td>

                    {showActions && (
                      <td className="text-center">
                        {onEdit && (
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => onEdit(item)}
                          >
                            <FaEdit />
                          </button>
                        )}

                        {onDelete && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => onDelete(item._id)}
                          >
                            <FaTrash />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
