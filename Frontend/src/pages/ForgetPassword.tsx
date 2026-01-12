import React from 'react'

export const ForgetPassword = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow-sm p-4 mx-auto" style={{ width: "100%", maxWidth: "420px", borderRadius: "12px" }}>

                {/* Header */}
                <div className="text-center mb-2">
                    <div className="mb-2 d-flex justify-content-center align-item-center">
                        {/* <i className="bi bi-wallet2 fs-1 text-primary mt-1"></i> */}
                        {/* <h2 className='text-primary ms-4 mt-3'>Expense Tracker</h2> */}
                        <h3 className="fw-bold ms-3 mt-1">Forget Password</h3>

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
                            placeholder="Enter Your Email"
                        />
                    </div>
                </div>


                {/* Button */}
                <button className="btn btn-primary w-100 py-2 fw-semibold">
                    Forget Password
                </button>

                {/* Footer */}
                {/* <div className="text-center mt-4">
                    <span className="text-muted">Don't have an account?  </span>
                    <a href="/login" className="text-primary fw-semibold text-decoration-none">
                        Sign Up
                    </a>
                </div> */}
            </div>
        </div>
  )
}
