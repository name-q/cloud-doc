import React from "react";

import "./index.less";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const TopTabs = () => (
  <div className="card-container">
    <Tabs type="card" onChange={key => alert(key)}>
      <TabPane tab="Tab Title 1" key="1" />
      <TabPane tab="Tab Title 1" key="2" />
      <TabPane tab="Tab Title 1" key="3" />
      <TabPane tab="Tab Title 1" key="4" />
    </Tabs>
  </div>
);

export default TopTabs;