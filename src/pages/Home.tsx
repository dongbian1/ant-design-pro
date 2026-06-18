import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';

const Home: React.FC = () => {
  return (
    <PageContainer title="欢迎">
      <Card className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">欢迎使用系统</h1>
        <p className="text-gray-500">这是您的首页，开始您的工作吧！</p>
      </Card>
    </PageContainer>
  );
};

export default Home;
