import './App.css'
import { Routes, Route, Router, useLocation } from "react-router-dom";
import LandingPage from './components/Landingpage';
import { ToastContainer } from "react-toastify";
import Dashboard from './dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import ProblemPageById from './pages/problempage/ProblemPageById';
import ContestList from './pages/contest/ContestList';
import ContestPageByID from './pages/contestpage/ContestPageByID';
import LeaderBoard from './pages/leaderboard/LeaderBoard';

function App() {
  const location = useLocation();
  console.log("Current path:", location.pathname);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/problem"
          element={
            // <ProtectedRoute>
            <Dashboard />
            // </ProtectedRoute>
          }
        />

        {/* dynamic problem route */}
        <Route path="/problem/:id" element={<ProblemPageById />} />
        <Route path="/contest/:id" element={<ContestPageByID />} />
        <Route path='/contest' element={<ContestList />} />
        <Route path='/leaderboard' element={<LeaderBoard />} />
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
