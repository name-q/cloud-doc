import React, { useState, memo, useMemo } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const Search = props => {

    const [searchKey, setSearchKey] = useState(null);
    const [onFocus, setOnFocus] = useState(false);
    const _change = e => setSearchKey(e.target.value)

    let { keydown } = props

    useMemo(() => {
        // 聚焦时响应键盘事件
        if (onFocus) {
            console.log('监听键盘>>>', keydown)
            if (keydown) {
                // esc清空
                if (['Escape'].includes(keydown)) {
                    setSearchKey(null)
                }
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
            value={searchKey}
            onChange={_change}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
        />
    )
}

export default memo(Search);