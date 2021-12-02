import React, { useState, memo, useMemo, useCallback } from 'react';
import { Input } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import './index.less';

const Search = props => {

    const [searchKey, setSearchKey] = useState(null);
    const [onFocus, setOnFocus] = useState(false);
    const _change = e => setSearchKey(e.target.value)

    let { keydown, searchCloud } = props

    useMemo(() => {
        // 聚焦时响应键盘事件
        if (onFocus) {
            console.log('监听键盘>>>', keydown)
            if (keydown) {
                // 清空
                if (['Escape', 'Delete'].includes(keydown)) {
                    setSearchKey(null)
                }
                // 搜索
                if (['Enter', 'NumpadEnter'].includes(keydown)) {
                    searchCloud(searchKey)
                }
            }
        }
    }, [keydown])

    return (
        <Input
            className='searchInput'
            bordered={false}
            placeholder="搜索云文档"
            suffix={
                <SearchOutlined
                    style={{ color: 'rgba(0,0,0,.45)' }}
                    onClick={useCallback(() => searchKey ? searchCloud(searchKey) : null, [searchKey])}
                />
            }
            value={searchKey}
            onChange={_change}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
        />
    )
}

export default memo(Search);