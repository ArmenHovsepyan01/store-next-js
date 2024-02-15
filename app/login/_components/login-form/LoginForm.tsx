import React, { useState } from 'react';
import { Button, Divider, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/lib/store/hooks';
import axios from 'axios';
import Cookies from 'js-cookie';
import { fetchUserData, setUser } from '@/app/lib/store/features/user/userSlice';
import { User } from '@/app/lib/definitions';
import { log } from 'node:util';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, dis] = useFormState(onFinish, undefined);
  const router = useRouter();
  const dispatch = useAppDispatch();
  async function onFinish() {
    try {
      const { data } = await axios.post('api/users/login', {
        email: email,
        password: password
      });

      console.log(data);
      Cookies.set('token', data.access_token);

      await dispatch(fetchUserData());
      router.replace('/dashboard');
    } catch (e: any) {
      console.error(e);
      return e.response.data.error.slice(6);
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
        onFinish={dis}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          label="Email">
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
          label="Password">
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
            }}>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </Form.Item>
      </Form>
    </main>
  );
};

export default LoginForm;
