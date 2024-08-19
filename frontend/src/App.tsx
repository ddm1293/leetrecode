import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Header from "./components/Header";
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import LogoutPage from './pages/Logout';
import CallBackPage from './pages/Callback';
import Dashboard from './pages/Dashboard';
import DailyReviewPage from './pages/DailyReviewPage';
import TutorialPage from './pages/TutorialPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LandingPage from './pages/LandingPage';

function App() {
  const bg = useColorModeValue("gray.100", "gray.800");

  return (
    <>
      <Box bg={bg} minH="100vh">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/login/callback" element={<CallBackPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/setting" element={<Setting />} /> */}
          <Route path="/review" element={<DailyReviewPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/resetpassword" element={<ResetPasswordPage />} />

          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Box>

    </>
  );
}

export default App;
