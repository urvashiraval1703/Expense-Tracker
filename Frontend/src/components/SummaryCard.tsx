import React, { type JSX } from 'react'
import { FaChartPie, FaMoneyBillWave, FaUsers, FaShoppingCart } from "react-icons/fa";


interface SummaryCardProps {
  title?: string;
  amount?: string;
  icon?: React.ReactNode;   // ✅ allow React element
  bgColor?: string;
  extra?: string;
}


export const SummaryCard = ({ title="", amount="0", icon= null, bgColor="", extra="" }:SummaryCardProps) => {
  return (
     <div className="col-md-4 col-sm-6 mb-4">
      <div className="card shadow-sm border-1 h-100">
        <div className="card-body d-flex align-items-center gap-3">
          
          {/* Icon */}
          <div
            className="d-flex align-items-center justify-content-center rounded"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: bgColor,
              color: "#fff",
              fontSize: "22px",
            }}
          >
            {icon}
          </div>

          {/* Content */}
          <div>
            <p className="text-muted mb-1">{title}</p>
            <h5 className="mb-0 fw-bold">{amount}</h5>
            {extra && <small className="text-success">{extra}</small>}
          </div>

        </div>
      </div>
    </div>
  )
}
