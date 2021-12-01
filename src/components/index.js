import React from 'react';
import { Row, Col } from 'antd';

import Search from './search'

const Index = () => (
  <Row style={{ height: '100vh' }}>
    <Col flex={2}>
      <Search />
    </Col>
    <Col flex={22}>
      r 3
    </Col>
  </Row>
);

export default Index;