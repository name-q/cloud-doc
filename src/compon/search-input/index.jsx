import React, { Component } from "react";

import { Input } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './index.less'

import { msg, setStorage, getStorage, cache } from '@/kit/index'


export default class SearchInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let update = nextState.inputValue !== this.state.inputValue
    if (update) msg.emit('searchInfoModalComponent-inputValue', nextState.inputValue)
    return update
  }

  render() {
    let { inputValue } = this.state
    return (
      <>
        <Input
          className="searchInputComponent"
          size="small"
          placeholder="搜索"
          value={inputValue}
          prefix={<SearchOutlined style={{ color: '#575757' }} />}
          suffix={
            inputValue
              ? <CloseCircleOutlined
                style={{ color: '#575757' }}
                onClick={() => {
                  this.setState({ inputValue: '' })
                  msg.emit('searchInfoModalComponent-visible', false)
                }}
              />
              : null
          }
          onChange={e => this.setState({ inputValue: e.target.value })}
          onPressEnter={() => this.onEnter()}
          onClick={() => { this.setState({ inputValue: '' }); msg.emit('searchInfoModalComponent-visible', true) }}
        />
      </>
    );
  }

  // 按下回车保存搜索内容到缓存（最多保存20条）
  onEnter = () => {
    let { inputValue } = this.state
    if (!inputValue) return
    let historyValue = getStorage(cache.SEARCH_HISTORY)
    if (!historyValue) {
      historyValue = [inputValue]
    } else {
      historyValue.unshift(inputValue)
      historyValue = Array.from(new Set(historyValue))
      historyValue = historyValue.slice(0, 20)
    }
    setStorage(cache.SEARCH_HISTORY, historyValue)
  }
}

