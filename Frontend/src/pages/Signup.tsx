import React, { useState } from 'react'
import { Button } from '../components/Button'
import "./Signup.css";
import { toast } from 'react-toastify'
import { signUpUser } from '../service/authService';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const validateForm = () => {
        if (formData.email == "" || formData.name == "" || formData.password == "") {
            toast.error("Please fill all required fields")
            return false
        }

        if (formData.name.length < 2) {
            toast.error("Name must be at least 2 characters")
            return false
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            toast.error("Invalid email format")
            return false
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(formData.password)) {
            toast.error("Password must be 8+ chars, include uppercase, lowercase, number & special char")
            return false
        }

        return true;
    }

    const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e)

        if (!validateForm()) return;

        try {
            const response = await signUpUser(formData)
            console.log(response)

            toast.success(response.data.message)

            navigate("/verifyOtp",{state:{formData}})


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
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow-sm p-4 mx-auto" style={{ width: "100%", maxWidth: "420px", borderRadius: "12px" }}>

                {/* Header */}
                <div className="text-center mb-4">
                    <div className="mb-2 d-flex justify-content-center align-item-center">
                        <i className="bi bi-wallet2 fs-1 text-primary mt-1"></i>
                        {/* <h2 className='text-primary ms-4 mt-3'>Expense Tracker</h2> */}
                        <h3 className="fw-bold ms-3 mt-3">Sign Up</h3>

                    </div>
                    <p className="text-muted">Create your account</p>
                </div>

                {/* Name */}
                <div className="mb-3">
                    <div className="input-group">
                        <span className="input-group-text bg-white">
                            <i className="bi bi-envelope text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Name"
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                    <div className="input-group">
                        <span className="input-group-text bg-white">
                            <i className="bi bi-envelope text-muted"></i>
                        </span>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                    <div className="input-group">
                        <span className="input-group-text bg-white">
                            <i className="bi bi-lock text-muted"></i>
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span
                            className="input-group-text bg-white"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </span>
                    </div>
                </div>

                <Button
                    text="Sign Up"
                    type="submit"
                    variant="primary"
                    onClick={handleSubmit}
                />

                {/* Footer */}
                <div className="text-center mt-4">
                    <span className="text-muted">Already have an account? </span>
                    <a href="/login" className="text-primary fw-semibold text-decoration-none">
                        Log in
                    </a>
                </div>
            </div>
        </div>




    )
}
