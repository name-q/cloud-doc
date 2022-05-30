

import React from 'react';

import './index.less'

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import hotSearchListMain from './redux-item/reducers/main';
import { store2Props } from './redux-item/selectors';
import actions from './redux-item/actions';
import { reduxIProps } from './redux-item/types'
registerReducer({ hotSearchListMain });

class HotSearchList extends React.Component<reduxIProps, any> {

  componentDidMount() {
    this.props.actions.init()
  }

  componentWillUnmount() {
    this.props.actions.clean()
  }


  render() {
    // 获取最新的时间
    let maxCreateTime = this.data[0].createTime
    this.data.forEach(iterm => { 
      if (iterm.createTime > maxCreateTime) maxCreateTime = iterm.createTime
    })
    return (
      <div className='hot-search-list-container' >
        <p className='title'>热搜榜</p>
        <div className='search-list-box'>
          {
            this.data.map((i, index) => (
              <div key={`searchListItem${index}`} className='search-list-item'>
                <p
                  className={index < 3 ? 'search-list-item-hot-sort' : 'search-list-item-sort'}
                >
                  {index + 1}
                </p>
                <p className='search-list-item-title'>{i.title}</p>
                <p className='search-list-item-number'>{i.searchNumber > 9999999999 ? '9999999999+' : i.searchNumber}</p>
                {!index && (<p className='search-list-item-hot'>HOT</p>)}
                {i.createTime === maxCreateTime && (<p className='search-list-item-new'>NEW</p>)}
              </div>
            ))
          }
        </div>
      </div>
    );
  }


  // demo data searchNumber sort
  data = [
    { title: 'a', searchNumber: 11111, createTime: 1 },
    { title: '一二三四五六七八九十', searchNumber: 1111, createTime: 11 },
    { title: '一二三四五六七八九十一二三四五六七八九十一二三四五六七八', searchNumber: 9999999999999999, createTime: 111 },
    { title: '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十', searchNumber: 9999, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 99999999999999999999999, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
    { title: 'aaa', searchNumber: 111, createTime: 111 },
  ]

}


export default connect(store2Props, actions)(HotSearchList)