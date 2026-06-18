import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, useModel } from '@umijs/max';
import { Alert, App } from 'antd';
import { createStyles } from 'antd-style';
import React, { startTransition, useState } from 'react';
import { Footer } from '@/components';
import { login } from '@/services/ant-design-pro/api';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(() => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      title={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const { message } = App.useApp();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fieldConfigs = {
    username: {
      placeholder: '用户名: admin or user',
      rules: [
        {
          required: true,
          message: '请输入用户名!',
        },
      ],
    },
    password: {
      placeholder: '密码: ant.design',
      rules: [
        {
          required: true,
          message: '请输入密码！',
        },
      ],
    },
  };

  const getSafeRedirectUrl = (redirect: string | null): string => {
    if (!redirect?.startsWith('/')) return '/';
    if (redirect.startsWith('//')) return '/';
    try {
      const parsed = new URL(redirect, window.location.origin);
      if (parsed.origin !== window.location.origin) return '/';
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    } catch {
      return '/';
    }
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      startTransition(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    setErrorMessage('');
    try {
      const msg = await login({ ...values, type: 'account' });
      if (msg.status === 'ok') {
        message.success('登录成功！');
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        const redirectUrl = getSafeRedirectUrl(urlParams.get('redirect'));
        window.location.href = redirectUrl;
        return;
      }
      if (msg.status === 'error') {
        setErrorMessage('账户或密码错误！');
      }
    } catch (error) {
      console.log(error);
      message.error('登录失败，请重试！');
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          登录页
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle="欢迎使用"
          initialValues={{
            autoLogin: true,
            username: 'admin',
            password: 'ant.design',
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {errorMessage && <LoginMessage content={errorMessage} />}
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder={fieldConfigs.username.placeholder}
            rules={fieldConfigs.username.rules}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder={fieldConfigs.password.placeholder}
            rules={fieldConfigs.password.rules}
          />
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              href="#"
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;