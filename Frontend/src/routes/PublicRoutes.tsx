import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { VerifyOtp } from "../pages/VerifyOtp";
import { ForgetPassword } from "../pages/ForgetPassword";
import { ResetPassword } from "../pages/ResetPassword";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verifyOtp" element={<VerifyOtp />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
    </Routes>
  );
};

export default PublicRoutes;
