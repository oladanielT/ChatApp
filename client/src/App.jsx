import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import ChatPage from "./pages/ChatPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { userAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { userAuth, isCheckAuth, checkAuth } = userAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(userAuth);

  if (isCheckAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center overflow-hidden p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_#4f4f4f2e_1px, transparent_1px), linear-gradient(to_bottom, #4f4f4f2e_1px, transparent_24px)] bg-[size:12px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px] " />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px] " />
      <Routes>
        <Route
          path="/"
          element={userAuth ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!userAuth ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!userAuth ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}
