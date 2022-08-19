

import React, { useState, memo } from 'react';

import { Menu as AtMenu } from 'antd'
import {
  CompassOutlined,
  TrophyOutlined,
  AimOutlined,
  ExperimentOutlined,
  FieldTimeOutlined,
  EditOutlined,
  AuditOutlined,
  StarOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

import './Menu.less'

// 源数据 key = router.path
const items: MenuProps['items'] = [
  { label: '发现造极', key: '/', icon: <ExperimentOutlined /> },
  { label: '私人FM', key: '/pages/privateZJ', icon: <AimOutlined /> },
  { label: '极高', key: '/pages/extremelyHigh', icon: <TrophyOutlined /> },
  { label: '广场', key: '/pages/square', icon: <CompassOutlined /> },
  {
    label: '我的造极',
    key: 'myZJ',
    disabled: true,
    children: [
      {
        label: '已发布',
        key: '/pages/myZJ',
        icon: <AuditOutlined />
      },
      {
        label: '编辑中',
        key: '/pages/myZJ/editList',
        icon: <EditOutlined />
      },
      {
        label: '最近使用',
        key: '/pages/myZJ/recentlyUsed',
        icon: <FieldTimeOutlined />
      },
      {
        label: '我的收藏',
        key: '/pages/myZJ/myCollection',
        icon: <StarOutlined />
      }
    ],
  },
];

const Menu: React.FC = () => {

  const [current, setCurrent] = useState('/');

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div className='MenuLeft'>
      <AtMenu
        onClick={onClick}
        selectedKeys={[current]}
        openKeys={['myZJ']}
        items={items}
        mode="inline"
        expandIcon={<p></p>}
      />
    </div>
  );
}


export default memo(Menu)