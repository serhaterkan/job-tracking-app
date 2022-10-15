import { GithubOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';

export default function Header() {
  return (
    <Layout.Footer>
      created by serhaterkan
      <a href="https://github.com/serhaterkan/job-tracking-app" target="_blank" rel="noreferrer">
        &nbsp;
        <GithubOutlined /> github
      </a>
    </Layout.Footer>
  );
}
