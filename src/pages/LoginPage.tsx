import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@app/components/auth/LoginForm/LoginForm';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const findToken = localStorage.getItem('AccessToken');
    if (findToken != null) {
      navigate('/');
    }
  });

  return (
    <>
      <PageTitle>{t('common.login')}</PageTitle>
      <LoginForm />
    </>
  );
};

export default LoginPage;
