import React from 'react';

import { msg, routeWithSubRoutes } from '@/kit/index';
import { authRouters } from '@/routers/index';

import './index.less'
import { Layout } from 'antd';

import HeaderOperate from './component/Header-operate'
import SearchInfoModal from '@/compon/search-info-modal';
import AvatarAndNick from './component/Avatar-and-nick';
import Menu from './component/Menu';

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import overviewMain from './redux-item/reducers/main';
import { store2Props } from './redux-item/selectors';
import actions from './redux-item/actions';
import { reduxIProps } from './redux-item/types'
registerReducer({ overviewMain });

const { Header, Footer, Sider, Content } = Layout;


class OverView extends React.Component<reduxIProps, any> {

  constructor(props) {
    super(props);
    this.state = {
      // 当前路由path
      matchedPath: '',
      VisibleLeftMenu: true,
      VisibleFooter: true,
    };
  }

  componentDidMount() {
    this.props.actions.init()
    msg.on('VisibleLeftMenu', this.showLeftMenu)
    msg.on('VisibleFooter', this.showFooter)
  }

  componentWillUnmount() {
    this.props.actions.clean()
    msg.off('VisibleLeftMenu', this.showLeftMenu)
    msg.off('VisibleFooter', this.showFooter)
  }

  render() {
    let {
      VisibleLeftMenu,
      VisibleFooter,
    } = this.state
    return (
      <>
        <Layout className='overView'>
          <Header>
            <HeaderOperate />
          </Header>
          <Layout>
            {VisibleLeftMenu && (
              <Sider style={{ overflowY: 'auto' }}>
                <AvatarAndNick />
                <Menu />
              </Sider>
            )}
            <Content style={{ overflowY: 'auto' }}>
              {routeWithSubRoutes(authRouters, this.handlePathMatched)}
            </Content>
          </Layout>
          {VisibleFooter && (
            <Footer>Footer</Footer>
          )}
        </Layout>

        {/* 公用组件 -msg-通信 */}
        <SearchInfoModal />
      </>
    );
  }

  // 显影左侧菜单
  showLeftMenu = VisibleLeftMenu => this.setState({ VisibleLeftMenu })

  // 显影底部操作栏
  showFooter = VisibleFooter => this.setState({ VisibleFooter })

  // 保存跳转后的路由路径
  handlePathMatched = matchedPath => {
    this.setState({
      matchedPath
    });
  };

}


export default connect(store2Props, actions)(OverView)