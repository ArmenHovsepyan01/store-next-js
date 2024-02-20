'use client';

import React, { useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const items = [VideoCameraOutlined, UploadOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`
}));

const MyStore = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ marginTop: 70 }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1'
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2'
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3'
            }
          ]}
        />
      </Sider>
    </Layout>
  );
};

export default MyStore;
