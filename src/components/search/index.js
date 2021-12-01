import React, { useState, memo, useMemo } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEventListener } from 'ahooks';
const Search = () => {

    const [searchKey, setSearchKey] = useState(null);
    const _change = e => setSearchKey(e.target.value)

    // 监听键盘
    const [keydown, setKeydown] = useState(null);
    useEventListener('keydown', (ev) => {
        setKeydown(ev.code);
    });
    console.log('监听键盘>>>', keydown)

    const inputRef = React.useRef(null);

    // 响应键盘事件
    useMemo(() => {
        if (keydown) {
            // esc清空
            if (['Escape'].includes(keydown)) {
                setSearchKey(null)
            }
        }
    }, [keydown])



    return (
        <Input
            bordered={false}
            placeholder="搜索云文档"
            suffix={
                <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            }
            ref={inputRef}
            value={searchKey}
            onChange={_change}
        />
    )
}

export default memo(Search);