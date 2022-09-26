

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
  HeartOutlined,
  DeploymentUnitOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {history} from '@/kit/index'
import './Menu.less'

// 基础源数据
const baseItems: MenuProps['items'] = [
  { label: '发现造极', key: '/', icon: <ExperimentOutlined /> },
  { label: '私人FM', key: '/pages/privateZJ', icon: <AimOutlined /> },
  { label: '创造极', key: '/pages/createZJ', icon: <DeploymentUnitOutlined /> },
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
      }
    ],
  },
];

// 创建的极合
const createZJGroup: MenuProps['items'] = [
  {
    label: '创建的极合',
    key: 'createZJGroup',
    disabled: true,
    children: [
      {
        label: '我喜欢的造极',
        key: '/pages/createZJGroup/ilike',
        icon: <HeartOutlined />
      },
    ],
  },
];

// 收藏的极合
const collectZJGroup: any = [
  {
    label: '收藏的极合',
    key: 'collectZJGroup',
    disabled: true,
    children: [
      
    ],
  },
];

const Menu: React.FC = () => {

  const [current, setCurrent] = useState('/');

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
    setCurrent(e.key);
    history.push(e.key)
  };
  return (
    <div className='MenuLeft'>
      <AtMenu
        onClick={onClick}
        selectedKeys={[current]}
        openKeys={['myZJ']}
        items={baseItems}
        mode="inline"
        expandIcon={<p></p>}
      />
      <AtMenu
        onClick={onClick}
        selectedKeys={[current]}
        openKeys={['createZJGroup']}
        items={createZJGroup}
        mode="inline"
        expandIcon={<p></p>}
      />
      { !!collectZJGroup[0].children.length && (<AtMenu
        onClick={onClick}
        selectedKeys={[current]}
        openKeys={['collectZJGroup']}
        items={collectZJGroup}
        mode="inline"
        expandIcon={<p></p>}
      />)}
    </div>
  );
}


export default memo(Menu)