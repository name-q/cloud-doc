import React, { useState, memo } from 'react';
import { Row, Col } from 'antd';
import { useEventListener } from 'ahooks';

import Search from './search'
import Operate from './operate'

const Index = () => {
    // 监听全局键盘
    const [keydown, setKeydown] = useState(null);
    useEventListener('keydown', (ev) => {
        setKeydown(ev.code);
    });

    const searchCloud = searchKey => {
        console.log(searchKey, '<<<searchKey')
    }

    // RedoOutlined spin
    let [spinReload, setSpinReload] = useState(false)
    const reload = () => {
        setSpinReload(true)
    }

    return (
        <Row style={{ height: '100vh' }}>
            <Col style={{ width: 200, background: '#eee' }}>
                <Search keydown={keydown} searchCloud={searchCloud} />
                <Operate reload={reload} spinReload={spinReload} />
            </Col>
            <Col flex={1}>
                r 3
            </Col>
        </Row>
    )
};

export default memo(Index);