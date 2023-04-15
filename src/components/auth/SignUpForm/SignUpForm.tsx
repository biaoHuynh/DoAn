import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doSignUp } from '@app/store/slices/authSlice';
import { notificationController } from '@app/controllers/notificationController';
import { ReactComponent as GoogleIcon } from '@app/assets/icons/google.svg';
import { ReactComponent as FacebookIcon } from '@app/assets/icons/facebook.svg';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from './SignUpForm.styles';
import AuthService from '../AuthService';

interface SignUpFormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = (values: SignUpFormData) => {
    setLoading(true);

    AuthService.register(values)
      .then((res: any) => {
        if (res.status === 1) {
          // localStorage.setItem('AccessToken', res.token);

          navigate('/');
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Auth.FormWrapper>
      <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional">
        <S.Title>{t('common.signUp')}</S.Title>
        <Auth.FormItem
          name="name"
          label={t('common.userName')}
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInput placeholder={t('common.userName')} />
        </Auth.FormItem>
        <Auth.FormItem name="email" label={'email'} rules={[{ required: true, message: t('common.requiredField') }]}>
          <Auth.FormInput placeholder={'email'} />
        </Auth.FormItem>
        <Auth.FormItem
          label={t('common.password')}
          name="password"
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInputPassword placeholder={t('common.password')} />
        </Auth.FormItem>
        <Auth.FormItem
          label={t('common.confirmPassword')}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: t('common.requiredField') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('common.confirmPasswordError')));
              },
            }),
          ]}
        >
          <Auth.FormInputPassword placeholder={t('common.confirmPassword')} />
        </Auth.FormItem>

        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
            {t('common.signUp')}
          </Auth.SubmitButton>
        </BaseForm.Item>

        <Auth.FooterWrapper>
          <Auth.Text>
            {t('signup.alreadyHaveAccount')}{' '}
            <Link to="/auth/login">
              <Auth.LinkText>{t('common.here')}</Auth.LinkText>
            </Link>
          </Auth.Text>
        </Auth.FooterWrapper>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
