import React from 'react';

import './index.less'
import { Layout } from 'antd';

import HeaderOperate from './component/Header-operate'
import SearchInfoModal from '@/compon/search-info-modal';

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import overviewMain from './redux-item/reducers/main';
import { store2Props } from './redux-item/selectors';
import actions from './redux-item/actions';
import { reduxIProps } from './redux-item/types'
registerReducer({ overviewMain });

const { Header, Footer, Sider, Content } = Layout;


class OverView extends React.Component<reduxIProps, any> {

  componentDidMount() {
    this.props.actions.init()
  }

  componentWillUnmount() {
    this.props.actions.clean()
  }

  render() {
    return (
      <>
        <Layout className='overView'>
          <Header>
            <HeaderOperate />
          </Header>
          <Layout>
            <Sider>Sider</Sider>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>

        {/* 公用组件 -msg-通信 */}
        <SearchInfoModal />
      </>
    );
  }


}


export default connect(store2Props, actions)(OverView)