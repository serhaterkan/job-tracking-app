import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../layouts';

// Route Page Lazy Load
const Dashboard = lazy(() => import('../pages/dashboard'));
const NotFound = lazy(() => import('../pages/404'));

const RoutesWrapper = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route element={<Layout />}>
        <Route exact index element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
);

export default RoutesWrapper;
