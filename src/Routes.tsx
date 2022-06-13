import React, { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/Home/index'));
const ContactPage = lazy(() => import('./modules/home/Contact/index'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage/LoginPage'));

// interface Props {}

export const myRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Routes location={location}>
        <Route path={ROUTES.login} element={LoginPage} />
        <ProtectedRoute path={ROUTES.home} element={HomePage} />
        <Route path={ROUTES.contact} element={ContactPage} />

        <Route path="/" element={LoginPage} />
      </Routes>
    </Suspense>
  );
};
