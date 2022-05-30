import React from 'react';

import './searchHistory.less'
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons';

import * as _ from 'lodash';
import { cache, removeStorage, getStorage, setStorage } from '@/kit/index'

export default class SearchHistory extends React.Component<any, any>{
  constructor(props) {
    super(props);
    this.state = {
      searchHistory: [],
      showDelete: ''
    }
  }

  componentDidMount() {
    let data = getStorage(cache.SEARCH_HISTORY)
    if (data?.length) {
      this.setState({ searchHistory: data })
    }
  }

  render() {
    let { searchHistory } = this.state
    return !!searchHistory.length && (
      <>
        <p className='title'>
          搜索历史
          <DeleteOutlined
            className='delete'
            onClick={() => removeStorage(cache.SEARCH_HISTORY)}
          />
        </p>
        <div className='history-box'>
          {searchHistory.map((item, index) => (
            <div
              key={`search-history-${index}`}
              className='history-item'
              onMouseMove={_.debounce(() => this.setState({ showDelete: index }), 100)}
              onMouseLeave={_.debounce(() => this.setState({ showDelete: '' }), 100)}
            >
              {item}
              {this.state.showDelete === index && (
                <CloseOutlined
                  className='history-item-delete'
                  onClick={()=>this.handleDelete(index)}
                />
              )}
            </div>
          ))}
        </div>
      </>
    );
  }

  // 删除单个历史记录
  handleDelete = index => {
    let { searchHistory } = this.state
    searchHistory = searchHistory.filter((i, k) => k !== index)
    this.setState({ searchHistory })
    setStorage(cache.SEARCH_HISTORY,searchHistory)
  }
}
