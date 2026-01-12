import { Signup } from './pages/Signup'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './pages/Login'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import { VerifyOtp } from './pages/VerifyOtp';
import { ResetPassword } from './pages/ResetPassword';
import { ForgetPassword } from './pages/ForgetPassword';
import { Dashboard } from './pages/Dashboard';

function App() {

  return (
    <div className='w-100'>
      <Router>
        <Routes>
          <Route path="/" Component={Signup} />
          <Route path="/signup" Component={Signup} />
          <Route path="/login" Component={Login} />
          <Route path="/verifyOtp" Component={VerifyOtp} />
          <Route path='/resetPassword' Component={ResetPassword} />
          <Route path='/forgetPassword' Component={ForgetPassword} />
          <Route path='/dashboard' Component={Dashboard}/>
        </Routes>

      </Router>

      {/* Toast container added here once globally */}
      <ToastContainer
        position="top-right"
        autoClose={3000}  // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </div>
  )
}

export default App
