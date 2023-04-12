import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { store2Props } from "../redux-item/selectors";
import actions from "../redux-item/actions";
import { reduxIProps } from "../redux-item/types";
import { registerReducer } from "@/redux/store";
import overviewMain from "../redux-item/reducers/main";

import { Spin } from "antd";
import { SketchCircleFilled } from "@ant-design/icons";

import { throttle } from "lodash";

const antIcon = <SketchCircleFilled style={{ fontSize: 36 }} spin />;

registerReducer({ overviewMain });

const ScrollPagination: React.FC<reduxIProps> = (props) => {
  const [page, setPage] = useState(1); // 当前页码
  const [data, setData] = useState([]); // 存放数据的数组
  const [spinning, setSpinning] = useState(true); // 加载中
  let {
    actions: {
      action: { getChatList, commonChange },
    },
    main,
  } = props;
  useEffect(() => {
    // 当页面加载时获取第一页的数据
    fetchData(true);
  }, []);

  // 获取数据
  const fetchData = async (init) => {
    setSpinning(true);
    const newData = await getChatList(init ? 1 : page);
    setData((prevState) => (init ? [...newData] : [...prevState, ...newData]));
    if (newData.length) setPage((prevState) => prevState + 1);
    setTimeout(() => {
      setSpinning(false);
    }, 1000);
  };

  // 检测滚动事件
  const handleScroll = throttle(async (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight) {
      fetchData(false);
    }
    if (!scrollTop) {
      setPage(1);
      fetchData(true);
    }
  }, 500);

  return (
    <Spin delay={100} spinning={spinning} indicator={antIcon}>
      <div
        onScroll={handleScroll}
        style={{
          height: "calc(100vh - 153px)",
          overflow: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {data.map((item) => (
          <div
            key={item._id}
            className="titleBox"
            onClick={() => {
              if (main.selectedId === item._id) return;
              commonChange("main.selectedId", item._id);
            }}
          >
            <div key={item._id} className="titleItem">
              {item.title}...
            </div>
          </div>
        ))}
      </div>
    </Spin>
  );
};

export default connect(store2Props, actions)(ScrollPagination);
