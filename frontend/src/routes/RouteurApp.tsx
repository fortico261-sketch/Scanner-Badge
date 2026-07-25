import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/components/LoginPage';
import Home from '../features/home/Home';
import AdminDashboard from '../features/admin/AdminDashboard';
import RouteProtegee from './RouteProtegee';
import TableauEmployes from '../features/employes/components/TableauEmployes';
import TableauChantiers from '../features/chantiers/components/TableauChantiers';

export default function RouteurApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/accueil" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/admin" element={<Navigate to="/login" replace />} />
        <Route path="/login/employee" element={<Navigate to="/login" replace />} />
        <Route
          path="/admin"
          element={
            <RouteProtegee>
              <AdminDashboard />
            </RouteProtegee>
          }
        />
        <Route
          path="/employes"
          element={
            <RouteProtegee>
              <TableauEmployes />
            </RouteProtegee>
          }
        />
        <Route
          path="/chantiers"
          element={
            <RouteProtegee>
              <TableauChantiers />
            </RouteProtegee>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
