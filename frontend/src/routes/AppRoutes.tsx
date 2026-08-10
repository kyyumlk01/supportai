import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}
