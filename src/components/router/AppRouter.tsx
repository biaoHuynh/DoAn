import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StompSessionProvider, useSubscription } from 'react-stomp-hooks';
import { notificationController } from '@app/controllers/notificationController';
// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('@app/components/layouts/AuthLayout/AuthLayout'));
import LoginPage from '@app/pages/LoginPage';
import SignUpPage from '@app/pages/SignUpPage';
import ForgotPasswordPage from '@app/pages/ForgotPasswordPage';
import SecurityCodePage from '@app/pages/SecurityCodePage';
import NewPasswordPage from '@app/pages/NewPasswordPage';
import LockPage from '@app/pages/LockPage';

import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import RequireAuth from '@app/components/router/RequireAuth';
import { withLoading } from '@app/hocs/withLoading.hoc';
import Dashboard from '@app/pages/DashBoard/DashBoard';
import Profile from '@app/pages/ProfilePage/ProfilePage';
import ListFriendPage from '@app/pages/HistoryPage/ListFriendPage';
import ChatPage from '@app/pages/ChatPage/ChatPage';
import AboutUs from '@app/pages/AboutUs/AboutUs';
import UserManager from '@app/pages/UserManager/UserManager';
import PostManager from '@app/pages/PostManager/PostManager';
import TopicManager from '@app/pages/TopicManager/TopicManager';
import AccessRoleManager from '@app/pages/AccessRoleManager/AccessRoleManager';
const DataTablesPage = React.lazy(() => import('@app/pages/DataTablesPage'));
const ChartsPage = React.lazy(() => import('@app/pages/ChartsPage'));
const ServerErrorPage = React.lazy(() => import('@app/pages/ServerErrorPage'));
const Error404Page = React.lazy(() => import('@app/pages/Error404Page'));
const AdvancedFormsPage = React.lazy(() => import('@app/pages/AdvancedFormsPage'));

const Logout = React.lazy(() => import('./Logout'));

export const NFT_DASHBOARD_PATH = '/';
export const MEDICAL_DASHBOARD_PATH = '/medical-dashboard';
const AdvancedForm = withLoading(AdvancedFormsPage);

const DataTables = withLoading(DataTablesPage);
const Charts = withLoading(ChartsPage);

const ServerError = withLoading(ServerErrorPage);
const Error404 = withLoading(Error404Page);

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);

export const AppRouter: React.FC = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={NFT_DASHBOARD_PATH} element={protectedLayout}>
          <Route index element={<AboutUs />} />
          <Route path="forms">
            <Route path="advanced-forms" element={<AdvancedForm />} />
          </Route>
          <Route path="data-tables" element={<DataTables />} />
          <Route path="list-friend" element={<ListFriendPage />} />
          <Route path="profile-page" element={<Profile />} />
          <Route path="profile-page/:id" element={<Profile />} />
          <Route path="chat-center" element={<ChatPage />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="/user-page" element={<UserManager />} />
          <Route path="/post-page" element={<PostManager />} />
          <Route path="/topic-page" element={<TopicManager />} />

          <Route path="server-error" element={<ServerError />} />
          <Route path="404" element={<Error404 />} />
        </Route>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route
            path="lock"
            element={
              <RequireAuth>
                <LockPage />
              </RequireAuth>
            }
          />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="security-code" element={<SecurityCodePage />} />
          <Route path="new-password" element={<NewPasswordPage />} />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};
