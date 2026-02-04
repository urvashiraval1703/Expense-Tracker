import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import { UserProvider } from './context/UserContext';
import PublicRoutes from './routes/PublicRoutes';
import { Analytics } from "./pages/Analytics";
import { Budget } from "./pages/Budget";
import { Dashboard } from "./pages/Dashboard";
import { Expense } from "./pages/Expense";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {

  return (
    <div className='w-100'>
      <UserProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/*" element={<PublicRoutes />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </UserProvider>
    </div>
  )
}

export default App
