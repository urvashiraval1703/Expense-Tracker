import React, { useState } from 'react'
import { Button } from '../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { verifyOtp,resendOtp } from '../service/authService'

export const VerifyOtp = () => {

    const [otp, setOtp] = useState("")
    const location = useLocation();
    const navigate = useNavigate();

    const userData = location.state;

    const validateForm = () => {
        if (otp.trim() == "") {
            toast.error("Please Enter Otp!!")
            return false;
        }
        return true
    }

    const resendOtpp = async()=>{
        try{
             const response = await resendOtp(userData)
            console.log(response)
            toast.success(response.data.message) 
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

    const handleSubmit = async () => {
        console.log(userData)
        if (!validateForm()) return;

        try {
            const response = await verifyOtp({ ...userData, otp })
            console.log(response)
            toast.success(response.data.message)
            navigate("/login")
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

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow-sm p-4 mx-auto" style={{ width: "100%", maxWidth: "420px", borderRadius: "12px" }}>

                {/* Header */}
                <div className="text-center mb-3">
                    <div className="mb-2 d-flex justify-content-center align-item-center">
                        {/* ?<i className="bi bi-wallet2 fs-1 text-primary mt-1"></i> */}
                        {/* <h2 className='text-primary ms-4 mt-3'>Expense Tracker</h2> */}
                        <h3 className="fw-bold ms-3 mt-1">Verify OTP</h3>

                    </div>
                </div>

                {/* Otp */}
                <div className="mb-3">
                    <div className="input-group">
                        <span className="input-group-text bg-white">
                            <i className="bi bi-envelope text-muted"></i>
                        </span>
                        <input
                            type="text"
                            name='otp'
                            value={otp}
                            className="form-control"
                            placeholder="Enter Otp"
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                </div>

                {/* Button */}
                <div>
                    <div>
                        <Button
                            text="Verify Otp"
                            type="submit"
                            variant="primary"
                            onClick={handleSubmit}
                        />
                    </div>


                    <div className='mt-2'>
                        <Button
                            text="Resend Otp"
                            type="submit"
                            variant="secondary"
                            onClick={resendOtpp}
                        />
                    </div>


                </div>


            </div>
        </div>
    )
}
