import React from 'react'
import "./Button.css";

interface ButtonProps {
  text: string,
  type?: "button" | "submit" | "reset",
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  text,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <div>
      <button 
        type={type}
        className={`btn btn-${variant} w-100 py-2 fw-semibold`}
        disabled = {disabled}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  )
}
