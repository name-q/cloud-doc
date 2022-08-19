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
    msg.on('searchInfoModalComponent-visible', this.handleVisible)
    msg.on('searchInfoModalComponent-inputValue', this.handleInputValue)

    // 监听点出组件
    document.addEventListener('mousedown', (e) => this.handleClickOutside(e), false);
  }

  componentWillUnmount() {
    msg.off('searchInfoModalComponent-visible', this.handleVisible)
    msg.off('searchInfoModalComponent-inputValue', this.handleInputValue)

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
          autoFocus={false}
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


  handleVisible = visible => {
    this.setState({ visible })
  }
  handleInputValue = inputValue => {
    this.setState({ inputValue })
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

