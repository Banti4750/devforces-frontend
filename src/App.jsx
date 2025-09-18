import './App.css'
import { Routes, Route } from "react-router-dom";
import LandingPage from './components/Landingpage';
import { ToastContainer } from "react-toastify";
import Dashboard from './dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Header />
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false}
        newestOnTop={false} theme="dark" closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        limit={5}
        closeButton={true} />
    </>
  );
}

export default App;
