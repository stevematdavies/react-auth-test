import React from 'react';
import Layout from "./components/Layout/Layout";
import {Routes, Route} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  return (
      <Layout>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<UserProfile />} />
          </Routes>
      </Layout>
  );
}

export default App;
