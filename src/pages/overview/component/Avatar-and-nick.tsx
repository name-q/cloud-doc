

import React from 'react';

import './Avatar-and-nick.less'

import { connect } from 'react-redux'
import { store2Props } from '../redux-item/selectors'
import actions from '../redux-item/actions'
import { reduxIProps } from '../redux-item/types'

import { Popover, Image } from 'antd';
import {
  CaretRightFilled, UserOutlined,
  CrownOutlined, SettingOutlined,
  RightOutlined, DisconnectOutlined,
  MailOutlined,
} from '@ant-design/icons'
import defaultAvatar from '@/assets/avatar.png'
import { goldCoin } from '@/assets/iconfontsvg'

class AvatarAndNick extends React.Component<reduxIProps, any> {

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  render() {
    let { visible } = this.state

    return (
      <div className='avatarAndNick'>
        <Image
          className='avatar'
          preview={{
            maskClassName: 'avatarEnter'
          }}
          src={defaultAvatar}
          onClick={e => e.stopPropagation()}
        />

        <Popover
          content={this.contentComponent}
          title={this.titleComponent}
          placement="right"
          trigger="click"
          // visible={true}
          open={visible}
          onOpenChange={this.handleVisibleChange}
        >
          <div className='nickBox'>
            <p>1111111111</p>
            <CaretRightFilled style={{ color: '#8e8e8e' }} />
          </div>
        </Popover>

      </div>
    );
  }

  handleVisibleChange = visible => {
    // 获取用户详细参数


    this.setState({ visible })
  }

  titleComponent = () => (
    <div className='avatarAndNick-titleComponent'>
      <div className='blockBox'>
        <div className='item'>
          <div className='number'>999999+</div>
          <div className='mark'>随笔</div>
        </div>
        <div className='item divider'>
          <div className='number'>999999+</div>
          <div className='mark'>造极</div>
        </div>
        <div className='item'>
          <div className='number'>999999+</div>
          <div className='mark'>粉丝</div>
        </div>
      </div>
      <div className='signInBox' >
        {goldCoin()}
        <p>签到</p>
      </div>
    </div>
  )

  contentComponent = () => (
    <div className='avatarAndNick-contentComponent'>
      <div className='rowBox'>
        <div className='nick'>
          <UserOutlined />
          <p>123456function=</p>
        </div>
      </div>
      <div className='rowBox'>
        <div className='nick'>
          <MailOutlined />
          <p>1620206666@qq.com</p>
        </div>
      </div>
      <div className='rowBoxline'>
        <div>
          <CrownOutlined style={{ margin: '0 10px' }} />
          会员等级
        </div>
        <div className='level-box'>
          <div className='level'>
            LV 888888
          </div>
        </div>
      </div>
      <div className='rowBox'>
        <div>
          <SettingOutlined style={{ margin: '0 10px' }} />
          个人信息设置
        </div>
        <RightOutlined style={{ margin: '0 10px', color: '#999' }} />
      </div>
      <div className='rowBox'>
        <div>
          <DisconnectOutlined style={{ margin: '0 10px' }} />
          退出登录
        </div>
      </div>
    </div>
  )

}

export default connect(store2Props, actions)(AvatarAndNick)