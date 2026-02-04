import React, { useContext } from 'react'
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Navbar = () => {
  const { setUser } = useContext(UserContext)!;
  const navigate = useNavigate();

  const Logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logout SuccessFully!!")
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg expense-navbar px-4">
      <div className="container-fluid">

        <Link className="navbar-brand d-flex align-items-center gap-2" to="/dashboard">
          <div className="logo-icon">💼</div>
          <span className="logo-text">Expense Tracker</span>
        </Link>

        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expense">Expenses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/analytics">Analytics</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/budget">Budget</Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span className="logout-text" onClick={Logout}>Logout</span>
          <FaUserCircle size={32} />
        </div>

      </div>
    </nav>
  );
};

