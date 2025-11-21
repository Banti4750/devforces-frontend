import './App.css'
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from './components/Landingpage';
import { ToastContainer } from "react-toastify";
import Dashboard from './dashboard/Dashboard';
import Header from './components/Header';
import ProblemPageById from './pages/problempage/ProblemPageById';
import ContestList from './pages/contest/ContestList';
import ContestPageByID from './pages/contestpage/ContestPageByID';
import LeaderBoard from './pages/leaderboard/LeaderBoard';
import Footer from './dashboard/Footer';
import ProfilePage from './pages/profilepage/ProfilePage';
import TutorialPage from './pages/tutorials/TutorialPage';
import TutorialPageById from './pages/tutorials/TutorialPageById';

function App() {
  const location = useLocation();
  const path = location.pathname;
  console.log("Current path:", location.pathname);

  const showFooterPaths = [
    "/problem",
    "/contest",
    "/leaderboard"
  ];

  const showFooter =
    showFooterPaths.some((p) => path.startsWith(p)) ||
    path.startsWith("/problem/") ||
    path.startsWith("/contest/") ||
    path.startsWith("/tutorial/") ||
    path.startsWith("/tutorial")
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* dynamic problem route */}
        <Route path="/problem" element={<Dashboard />} />
        <Route path="/problem/:id" element={<ProblemPageById />} />
        <Route path="/contest/:id" element={<ContestPageByID />} />
        <Route path='/contest' element={<ContestList />} />
        <Route path='/leaderboard' element={<LeaderBoard />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/tutorial' element={<TutorialPage />} />
        <Route path="/tutorial/:id" element={<TutorialPageById />} />
      </Routes>
      {showFooter && <Footer />}
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
