import React, { memo, useCallback } from 'react';

import { UserOutlined, UserDeleteOutlined, FileAddOutlined, FolderAddOutlined, RedoOutlined, DeleteOutlined } from '@ant-design/icons';

import './index.less';

const Operate = props => {

    let { reload, spinReload } = props

    return (
        <div className='operate'>
            {/* 登入登出 */}
            <UserOutlined />
            <UserDeleteOutlined />

            {/* 文件控制 */}
            <FileAddOutlined />
            <FolderAddOutlined />
            <RedoOutlined spin={spinReload} onClick={useCallback(() => reload(), [reload])} />
            <DeleteOutlined />
        </div>
    )
}

export default memo(Operate);