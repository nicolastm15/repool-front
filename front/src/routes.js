import React from 'react';
import { Navigate } from 'react-router-dom';
import GeneralLayout from 'src/layouts/GeneralLayout';
import AccountView from 'src/views/account/AccountView';
import AnuncioListView from 'src/views/anuncio/AnuncioListView';
import LoginView from 'src/views/auth/LoginView';
import RegisterView from 'src/views/auth/RegisterView';
import NotFoundView from 'src/views/errors/NotFoundView';
import PropriedadeListView from 'src/views/propriedade/PropriedadeListView';
import AdmDashboardView from 'src/views/reports/AdmDashboardView';
import OwnerDashboardView from 'src/views/reports/OwnerDashboardView';
import SettingsView from 'src/views/settings/SettingsView';
import AnuncioDetails from './views/anuncio/AnuncioDetailsView';
import CadPropriedadeView from './views/propriedade/CadPropriedadeView';
import PropriedadeDetails from './views/propriedade/PropriedadeDetailsView';

const simpleLoggedInRoutes = [
  {
    path: '/',
    element: <GeneralLayout />,
    children: [
      { path: '/', element: <Navigate to='/anuncios' /> },
      { path: 'account', element: <AccountView /> },
      { path: '/anuncios', element: <AnuncioListView /> },
      { path: 'anuncios/:id', element: <AnuncioDetails /> },
      { path: 'propriedades', element: <PropriedadeListView /> },
      { path: 'propriedades/new', element: <CadPropriedadeView /> },
      { path: 'propriedades/:id', element: <PropriedadeDetails /> },
      { path: 'favoritos', element: <AnuncioListView /> },
      { path: 'favoritos/:id', element: <AnuncioDetails /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
];

const ownerLoggedInRoutes = [
  {
    path: '/',
    element: <GeneralLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: '/', element: <OwnerDashboardView /> },
      { path: 'anuncios', element: <AnuncioListView /> },
      { path: 'anuncios/:id', element: <AnuncioDetails /> },
      { path: 'propriedades', element: <PropriedadeListView /> },
      { path: 'propriedades/new', element: <CadPropriedadeView /> },
      { path: 'propriedades/:id', element: <PropriedadeDetails /> },
      { path: 'favoritos', element: <AnuncioListView /> },
      { path: 'favoritos/:id', element: <AnuncioDetails /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
];

const admLoggedInRoutes = [
  {
    path: '/',
    element: <GeneralLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: '/', element: <AdmDashboardView /> },
      { path: 'anuncios', element: <AnuncioListView /> },
      { path: 'anuncios/:id', element: <AnuncioDetails /> },
      { path: 'favoritos', element: <AnuncioListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
];

const loggedOutRoutes = [
  {
    path: '/',
    element: <GeneralLayout />,
    children: [
      { path: '/', element: <LoginView /> },
      { path: 'anuncios', element: <AnuncioListView /> },
      { path: 'anuncios/:id', element: <AnuncioDetails /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
];

const routes = (userToken, userRole) => {
  if (userToken) {
    if (userRole === 'ADMIN') {
      return admLoggedInRoutes;
    }
    if (userRole === 'OWNER') {
      return ownerLoggedInRoutes;
    }
    return simpleLoggedInRoutes;
  }
  return loggedOutRoutes;
};

export default routes;
