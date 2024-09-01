import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Header from "./components/header/Header";
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import CallBackPage from './pages/Callback';
import Dashboard from './pages/Dashboard';
import DailyReviewPage from './pages/DailyReviewPage';
import TutorialPage from './pages/TutorialPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  const bg = useColorModeValue("gray.100", "gray.800");

  return (
    <>
      <Box bg={bg} minH="100vh">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/callback" element={<PrivateRoute element={<CallBackPage />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          {/* <Route path="/setting" element={<Setting />} /> */}
          <Route path="/review" element={<PrivateRoute element={<DailyReviewPage />} />} />
          <Route path="/tutorial" element={<PrivateRoute element={<TutorialPage />} />} />
          <Route path="/resetpassword" element={<PrivateRoute element={<ResetPasswordPage />} />} />

          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Box>

    </>
  );
}

export default App;
