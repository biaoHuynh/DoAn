import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { notificationController } from '@app/controllers/notificationController';

import * as S from './LoginForm.styles';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import AuthService from '../AuthService';
interface LoginFormData {
  email: string;
  password: string;
}

export const initValues: LoginFormData = {
  email: 'admin',
  password: 'admin',
};

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values: LoginFormData) => {
    setLoading(true);

    AuthService.login(values)
      .then(async (res: any) => {
        if (res.status === 1) {
          localStorage.setItem('AccessToken', res.data.accessToken);
          await AuthService.verifyToken().then((resp: any) => {
            localStorage.setItem('UserData', JSON.stringify(resp.data));
            navigate('/');
            notificationController.success({
              message: 'Login Success',
            });
          });
        } else {
          notificationController.error({
            message: res.message,
          });
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Auth.FormWrapper>
      <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={initValues}>
        <Auth.FormTitle>{t('common.login')}</Auth.FormTitle>
        <S.LoginDescription>{t('login.loginInfo')}</S.LoginDescription>
        <Auth.FormItem
          name="email"
          label={t('common.userName')}
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInput placeholder={t('common.userName')} />
        </Auth.FormItem>
        <Auth.FormItem
          label={t('common.password')}
          name="password"
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInputPassword placeholder={t('common.password')} />
        </Auth.FormItem>
        <Auth.ActionsWrapper>
          <BaseForm.Item name="rememberMe" valuePropName="checked" noStyle>
            <Auth.FormCheckbox>
              <S.RememberMeText>{t('login.rememberMe')}</S.RememberMeText>
            </Auth.FormCheckbox>
          </BaseForm.Item>
          <Link to="/auth/forgot-password">
            <S.ForgotPasswordText>{t('common.forgotPass')}</S.ForgotPasswordText>
          </Link>
        </Auth.ActionsWrapper>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
            {t('common.login')}
          </Auth.SubmitButton>
        </BaseForm.Item>
        <Auth.FooterWrapper>
          <Auth.Text>
            {t('login.noAccount')}{' '}
            <Link to="/auth/sign-up">
              <Auth.LinkText>{t('common.here')}</Auth.LinkText>
            </Link>
          </Auth.Text>
        </Auth.FooterWrapper>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
