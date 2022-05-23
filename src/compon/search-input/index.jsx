import React, { Component } from "react";

import { Input } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './index.less'

import { msg } from '@/kit/index'


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
          onFocus={() => msg.emit('searchInfoModalComponent-visible', true)}
        />
      </>
    );
  }

}

