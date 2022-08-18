import React from "react";

import { fromJS } from 'immutable'

import { RightOutlined } from '@ant-design/icons';

import def from '@/assets/test133.png'
import def2 from '@/assets/test170x95.png'
import def3 from '@/assets/test60.png'

import "./index.less";
import history from "@/kit/history";
import { Tag } from 'antd';

// 图文宫格组件
class Palace extends React.PureComponent {

  render() {
    let { styleType, dataSource, title, titleUrl } = this.props
    if (!dataSource.size) return null
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
          {dataSource.slice(0.10).map((item, key) => (
            <div className="itemBox1" key={`palaceItem1${key}`}>
              <img src={item.get("img") || def} alt='' />
              <div className="text">
                {item.get("title")}
              </div>
            </div>
          ))}
        </div>
      )
    },

    renderType2: dataSource => {
      return (
        <div className="PalaceItem2">
          {dataSource.slice(0, 4).map((item, key) => (
            <div className="itemBox2" key={`palaceItem2${key}`}>
              <img src={item.get("img") || def2} alt='' />
              <div className="text">
                {item.get("title")}
              </div>
            </div>
          ))}
        </div>
      )
    },

    renderType3: dataSource => {
      return (
        <div className="PalaceItem3">
          {dataSource.slice(0, 10).map((item, key) => (
            <div className="itemBox3"
              key={`palaceItem3${key}`}
              style={[8, 9].includes(key) ? { borderBottom: '1px solid #f7f7f7' } : null}
            >
              <img src={item.get("img") || def3} alt='' />

              <p className="sort">{key < 10 ? '0' + (key + 1) : key}</p>

              <div className="contentBox">
                <div className="text">
                  {item.get("title")}
                  <span className="subtitle">{item.get('subtitle')}</span>
                </div>
                <div className="author">
                  {item.get("highQuality") && (<Tag color="#f50">HQ</Tag>)}
                  {item.get("author")}
                </div>
              </div>

            </div>
          ))}
        </div>
      )
    },

    renderType4: dataSource => {
      return (
        <div className="PalaceItem4">
          {dataSource.slice(0, 10).map((item, key) => (
            <div className="itemBox4"
              key={`palaceItem3${key}`}
              style={[8, 9].includes(key) ? { borderBottom: '1px solid #f7f7f7' } : null}
            >
              <img src={item.get("img") || def3} alt='' />

              <div className="contentBox">
                <div className="text">
                  {item.get("title")}
                  <span className="subtitle">{item.get('subtitle')}</span>
                </div>
                <div className="author">
                  {item.get("author")}
                </div>
              </div>

            </div>
          ))}
        </div>
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
   styleType - 4
   □ □ (简3)
   □ □
  */
  styleType: 3,
  dataSource: fromJS([
    {
      title: 'default datadefault datadefault datadefault datadefault datadefault data',
      img: '',
      url: '/',
      hotNumber: 999,
      author: '作者作者作者作者作者作者作者作者作者作者作者作者作者',
      highQuality: true
    },
    {
      title: 'default data',
      subtitle: '(副标题副标题副标题副标题副标题副标题副标题)',
      img: '',
      url: '/',
      hotNumber: 999,
      author: '作者作者作者',
      highQuality: false
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999,
      author: '作者作者作者',
      highQuality: true
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999,
      author: '作者作者作者',
      highQuality: true
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999,
      author: '作者作者作者',
      highQuality: false
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999,
      author: '作者作者作者',
      highQuality: false
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999,
      author: '作者作者作者',
      highQuality: false
    },
    {
      title: 'default data',
      img: '',
      url: '/',
      hotNumber: 999,
      author: '作者作者作者',
      highQuality: false
    },
    {
      title: 'default datadefault datadefault datadefault datadefault datadefault data',
      img: '',
      url: '/',
      hotNumber: 999,
      author: '作者作者作者',
      highQuality: true
    },
    {
      title: 'default datadefault datadefault datadefault datadefault datadefault data',
      img: '',
      url: '/',
      hotNumber: 999,
      author: '作者作者作者',
      highQuality: false
    }
  ]),
  showHotIcon: false,
  title: '默认标题',
  titleUrl: '/'
}

export default Palace;
