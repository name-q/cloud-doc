import React, { PureComponent } from "react";
import { findDOMNode } from 'react-dom'

import { Drawer } from 'antd';

import HotSearchList from "@/compon/hot-search-list";
import SearchHistory from "./component/searchHistory";
import './index.less'

import { msg } from '@/kit/index'

export default class SearchInfoModal extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      visible: false
    }
    this.drawer = null
  }

  componentDidMount() {
    msg.on('searchInfoModalComponent-visible', visible => this.setState({ visible }))
    msg.on('searchInfoModalComponent-inputValue', inputValue => this.setState({ inputValue }))

    // 监听点出组件
    document.addEventListener('mousedown', (e) => this.handleClickOutside(e), false);
  }

  componentWillUnmount() {
    msg.off('searchInfoModalComponent-visible', visible => this.setState({ visible }))
    msg.off('searchInfoModalComponent-inputValue', inputValue => this.setState({ inputValue }))

    document.removeEventListener('mousedown', (e) => this.handleClickOutside(e), false);
  }

  render() {
    let { inputValue, visible } = this.state

    // 可视或存在搜索值时显示
    return (visible || inputValue) && (

      <center
        ref={element => this.drawer = element}
      >
        <Drawer
          className="searchInfoModalComponent"
          mask={false}
          closable={false}
          getContainer={"center"}
          visible={visible || inputValue}
          onClose={this.hideComponent}
        >
          <SearchHistory />
          <HotSearchList />
        </Drawer>
      </center>
    )
  }

  handleClickOutside(e) {
    if (this.drawer) {
      let result = findDOMNode(this.drawer).contains(e.target);
      if (!result) this.hideComponent()
    }
  }

  hideComponent = () => {
    this.setState({ visible: false, inputValue: '' })
    document.removeEventListener('mousedown', (e) => this.handleClickOutside(e), false);
  }

}

