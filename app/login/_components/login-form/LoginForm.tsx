import React, { useEffect, useState } from 'react';
import { Button, Divider, Flex, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/app/lib/store/hooks';
import axios from 'axios';
import Cookies from 'js-cookie';
import { fetchUserData } from '@/app/lib/store/features/user/userSlice';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, dis] = useFormState(onFinish, undefined);
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(params);
    if (searchParams.toString() === 'confirmed=true') {
      message.success('You successfully pass the verification.');
    }
  }, []);

  async function onFinish() {
    try {
      const { data } = await axios.post('api/users/login', {
        email: email,
        password: password
      });

      Cookies.set('token', data.access_token);

      await dispatch(fetchUserData());
      router.replace('/mystore');
    } catch (e: any) {
      console.error(e);
      return e.response.data.error;
    }
  }

  return (
    <main>
      <h2>Login</h2>
      <Divider />
      <Form
        layout={'vertical'}
        name="normal_login"
        style={{ width: 400 }}
        initialValues={{ remember: true }}
        onFinish={dis}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          label="Email"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type={'email'}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          label="Password"
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Flex gap={24} align={'center'} justify={'space-between'}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or
            <Link href="/register">register now!</Link>
          </Flex>
        </Form.Item>

        <Form.Item>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'red'
            }}
          >
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </Form.Item>
      </Form>
    </main>
  );
};

export default LoginForm;
