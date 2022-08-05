import React from "react";

import { fromJS } from 'immutable'

import { RightOutlined } from '@ant-design/icons';

import def from '@/assets/test133.png'
import "./index.less";
import history from "@/kit/history";

// 图文宫格组件
class Palace extends React.PureComponent {

  render() {
    let { styleType, dataSource, title, titleUrl } = this.props

    return (
      <div className="PalaceComponent">
        <p className="title" onClick={() => history.push(titleUrl)}>
          {title}
          <RightOutlined style={{ fontSize: 15 }} />
        </p>
        {this.renderSwitch[`renderType${styleType}`](dataSource)}
      </div>
    )
  }

  // styleType对应的渲染单元
  renderSwitch = {
    renderType1: dataSource => {
      return (
        <div className="PalaceItem1">
          {dataSource.toJS().map(item => (
            <div className="itemBox1">
              <img src={item.img || def} />
              <div className="text">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      )
    },

    renderType2: dataSource => {
      return (
        <>
          {dataSource.toJS().map(item => (
            <p>{item.title}</p>
          ))}
        </>
      )
    },

    renderType3: dataSource => {
      return (
        <>
          {dataSource.toJS().map(item => (
            <p>{item.title}</p>
          ))}
        </>
      )
    },
  }
}

Palace.defaultProps = {
  /*
   styleType - 1
   □ □ □ □ □
   □ □ □ □ □
   styleType - 2
   □ □ □ □
   □ □ □ □
   styleType - 3
   □ □
   □ □
  */
  styleType: 1,
  dataSource: fromJS([
    {
      title: 'default datadefault datadefault datadefault datadefault datadefault data',
      img: '',
      url: '/',
      hotNumber: 999
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999
    },
    {
      title: 'default datadefault datadefault datadefault datadefault datadefault data',
      img: '',
      url: '/',
      hotNumber: 999
    },
    {
      title: 'default datadefault datadefault datadefault datadefault datadefault data',
      img: '',
      url: '/',
      hotNumber: 999
    }
  ]),
  showHotIcon: false,
  title: '默认标题',
  titleUrl: '/'
}

export default Palace;
