import React from "react";

import { Progress } from 'antd';

import * as _ from 'lodash';

import def from '@/assets/test.png'
import "./index.less";

class Slide extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      // 轮播样式
      slideClass: [
        "middle",
        "start",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "end"
      ],
      // 进度条数值
      percent: 0,
      // 当前展示索引
      key: 0
    };
  }

  componentDidMount() {
    this.cycle = setInterval(() => this.handleProgress(), 100)
  }

  componentWillUnmount() {
    if (this.cycle) clearInterval(this.cycle)
  }

  render() {
    const { slideClass, percent } = this.state;
    return (
      <div
        className='slideComponent'
        onMouseMove={_.debounce(() => { if (this.cycle) clearInterval(this.cycle) }, 100)}
        onMouseLeave={_.debounce(() => {
          if (this.cycle) clearInterval(this.cycle)
          this.cycle = setInterval(() => this.handleProgress(), 100)
        }, 1000)}
      >
        <div className='slideBox'>
          {slideClass.map((item, key) => (
            <div className={`slide ${item}`} key={`slideBox-${key}`}>
              <img src={def} alt="" />
              <div
                className={item === 'middle' ? '' : 'masking'}
                onClick={() => this.slide(item, key)}
              />
            </div>
          ))}
        </div>

        <div className="scheduleBox">
          {slideClass.map((item, key) => (
            item === 'middle'
              ? (
                <Progress
                  key={`scheduleBox-${key}`}
                  percent={percent}
                  status="active"
                  showInfo={false}
                />
              )
              : (
                <div
                  className='scheduleBox-silence'
                  onClick={() => this.handleClickProgress(key)}
                  key={`scheduleBox-${key}`}
                >
                  <Progress
                    percent={0}
                    showInfo={false}
                  />
                </div>
              )
          ))}
        </div>
      </div >
    )
  }

  // 点击加载下一条数据
  slide(name, key) {
    this.setState({ key });
    this.imgArr(name);
  }

  // 重新排序class
  imgArr(name) {
    let { slideClass } = this.state
    if (name === 'end') slideClass.unshift(slideClass.pop());
    if (name === 'start') slideClass.push(slideClass.shift());
    this.setState({ slideClass });
  }

  // 进度条数值控制 3秒跳转一次 1000SS/100SS / 3 = 3.3333
  handleProgress = () => {
    let { percent, key, slideClass } = this.state
    if (percent >= 100) {
      // 触发下一页
      let length = slideClass.length - 1
      key += 1
      key = key > length ? 0 : key
      this.slide('end', key)
      // 置空
      this.setState({ percent: 0 })
    } else {
      percent += 3.3333
      this.setState({ percent })
    }
  }

  // 处理点击进度条
  handleClickProgress = key => {
    this.setState({ percent: 10 })
    this.setState({ key });
    let slideClass = ['middle', 'start', 'normal', 'normal', 'normal', 'normal', 'normal', 'end']
    if (key === 1) slideClass = ['end', 'middle', 'start', 'normal', 'normal', 'normal', 'normal', 'normal']
    if (key === 2) slideClass = ['normal', 'end', 'middle', 'start', 'normal', 'normal', 'normal', 'normal']
    if (key === 3) slideClass = ['normal', 'normal', 'end', 'middle', 'start', 'normal', 'normal', 'normal']
    if (key === 4) slideClass = ['normal', 'normal', 'normal', 'end', 'middle', 'start', 'normal', 'normal']
    if (key === 5) slideClass = ['normal', 'normal', 'normal', 'normal', 'end', 'middle', 'start', 'normal']
    if (key === 6) slideClass = ['normal', 'normal', 'normal', 'normal', 'normal', 'end', 'middle', 'start']
    if (key === 7) slideClass = ['start', 'normal', 'normal', 'normal', 'normal', 'normal', 'end', 'middle']
    this.setState({ slideClass });
  }

}

export default Slide;
