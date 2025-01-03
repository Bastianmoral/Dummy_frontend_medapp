import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserView from "../components/UserView";
import SellerView from "../components/SellerView";
import AdminView from "../components/AdminView";
import authService from "../services/authService";

const ProtectedRoute = ({ role, children }) => {
  const user = authService.getCurrentUser(); // Decodificar el JWT y obtener rol
  if (!user || user.role !== role) {
    return <Navigate to='/login' />;
  }
  return children;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/user'
          element={
            <ProtectedRoute role='user'>
              <UserView />
            </ProtectedRoute>
          }
        />
        <Route
          path='/seller'
          element={
            <ProtectedRoute role='seller'>
              <SellerView />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <ProtectedRoute role='admin'>
              <AdminView />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
