import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface LoginFormValues {
  login: string;
  password: string;
}

const StyledForm = styled(Form<LoginFormValues>)`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  .ant-form-item-label label {
    font-weight: 500;
  }
`;

const Title = styled.h1`
  margin-bottom: 16px;
  font-size: 16px;
  color: #000;
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onFinish = (values: { login: string; password: string }) => {
    localStorage.setItem('auth', 'true');
    navigate('/users', { replace: true });
  };

  return (
    <StyledForm
      name="login"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Title>Авторизация</Title>
      <Form.Item
        name="login"
        rules={[{ required: true, message: 'Введите логин' }]}
      >
        <Input placeholder="Логин" size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password
          placeholder="Пароль"
          size="large"
          iconRender={(visible) =>
            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
        />
      </Form.Item>
      <Form.Item>
        <SubmitWrapper>
          <Button type="primary" htmlType="submit" size="large">
            Войти
          </Button>
        </SubmitWrapper>
      </Form.Item>
    </StyledForm>
  );
};
