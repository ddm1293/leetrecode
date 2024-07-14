import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import RecordDetail from './pages/RecordDetail';
import Submissions from './pages/Submissions';
import SubmissionDetail from './pages/SubmissionDetail';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/records" element={<Records />} />
        <Route path="/record/:id" element={<RecordDetail />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/submission/:id" element={<SubmissionDetail />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
