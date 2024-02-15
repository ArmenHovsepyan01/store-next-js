'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import axios from 'axios';

import { Button, Divider, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useFormState } from 'react-dom';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, dispatch] = useFormState(onFinish, undefined);

  const { replace } = useRouter();
  async function onFinish() {
    try {
      const { data } = await axios.post('api/users/register', {
        firstName: name,
        lastName: lastName,
        email: email,
        password: password
      });

      console.log(data);

      replace('/login');
    } catch (e: any) {
      return e.response.data.error.slice(6);
    }
  }

  return (
    <main>
      <h2>Register</h2>
      <Divider />
      <Form
        layout={'vertical'}
        name="normal_register"
        style={{ width: 400 }}
        initialValues={{ remember: true }}
        onFinish={dispatch}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
          label="First name">
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="lastname"
          rules={[{ required: true, message: 'Please input your lastname!' }]}
          label="Last name">
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>

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
          label="Password"
          hasFeedback={true}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            minLength={4}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="confirm-password"
          label="Confirm password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              }
            })
          ]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <div style={{ marginBottom: 12, color: 'red' }}>{errorMessage}</div>
        <Form.Item>
          <Flex gap={24} align={'center'} justify={'space-between'}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Sign up
            </Button>
            Or
            <Link href="/login">Log in</Link>
          </Flex>
        </Form.Item>
      </Form>
    </main>
  );
};

export default Register;
