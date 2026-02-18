import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
`;

export const NotFoundPage: React.FC = () => (
  <Wrapper>
    <Result
      status="404"
      title="404"
      subTitle="Страница не найдена"
      extra={
        <Link to="/users">
          <Button type="primary">На главную</Button>
        </Link>
      }
    />
  </Wrapper>
);
