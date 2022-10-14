import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './default/Footer';
import Header from './default/Header';

const { Content } = Layout;

const DefaultLayout = () => {
  return (
    <Layout>
      <Header />
      <Content className="main">
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default DefaultLayout;
