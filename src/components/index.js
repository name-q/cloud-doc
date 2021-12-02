import React, { useState, memo } from 'react';
import { Row, Col } from 'antd';
import { useEventListener } from 'ahooks';

import Search from './search'

const Index = () => {
    // 监听全局键盘
    const [keydown, setKeydown] = useState(null);
    useEventListener('keydown', (ev) => {
        setKeydown(ev.code);
    });

    return (
        <Row style={{ height: '100vh' }}>
            <Col flex={2}>
                <Search keydown={keydown} />
            </Col>
            <Col flex={22}>
                r 3
            </Col>
        </Row>
    )
};

export default memo(Index);