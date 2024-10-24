import { Tabs } from 'antd'
import React, { useState } from 'react'
const { TabPane } = Tabs;
export default function TabHomeMovie() {
  const [state, setState] = useState({
    tabPosition: "left",
  });
  const changeTabPosition = (e) => {
    this.setState({ tabPosition: e.target.value });
  };
    return (
        <div className="container">
        <Tabs tabPosition={state.tabPosition}>
          <TabPane
            tab={
              <img
                width={50}
                src="https://picsum.photos/200"
                className="rounded-full"
              />
            }
            key="1"
          >
            Content of Tab 1
          </TabPane>
          <TabPane
            tab={
              <img
                width={50}
                src="https://picsum.photos/200"
                className="rounded-full"
              />
            }
            key="2"
          >
            Content of Tab 2
          </TabPane>
          <TabPane
            tab={
              <img
                width={50}
                src="https://picsum.photos/200"
                className="rounded-full"
              />
            }
            key="3"
          >
            Content of Tab 3
          </TabPane>
        </Tabs>
        </div>
    )
}
