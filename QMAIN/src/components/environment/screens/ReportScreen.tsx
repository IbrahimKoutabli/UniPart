import React from "react";
import { Layout, Tabs, Progress } from "antd";
import { observer, inject } from "mobx-react";
import { configure } from "mobx";

import Title from "../layout/Title";
// // import { navbarItems } from "../../../data/data";
import tabs from "../tabs/tabs";
configure({ enforceActions: true });

const TabPane = Tabs.TabPane;
interface Props {
  currentTab: string;
  history: string[];
  reportStore: any;
}
@inject("reportStore")
@observer
class ReportScreen extends React.Component<Props> {
  static defaultProps = { currentTab: "INCIDENT_TAB" };

  onChangeTab = (key: string) => {
    const { history } = this.props;
    history.push(tabs[key].path);
  };

  render() {
    const { currentTab, reportStore } = this.props;
    // const allowedTabs = applyPermissionsTabs('R');
    return (
      <Layout>
        <div>
          <Title
            title="Title of Report"
            subTitle="(IRN: Will autogenerate a number once saved)"
            complete={this.props.reportStore.isComplete}
          />
          <Tabs activeKey={currentTab} onChange={this.onChangeTab}>
            {Object.keys(tabs).map(tab => {
              const TabContentComponent = tabs[tab].component;
              const tabTitle = (
                <div>
                  {tabs[tab].key} <br />{" "}
                  {tabs[tab].path !== window.location.pathname ? (
                    <Progress
                      style={{ width: "80px" }}
                      percent={reportStore.getTabProgress(tab)}
                      size="default"
                      status="active"
                      showInfo={false}
                    />
                  ) : (
                    <Progress // just to keep titles inline, quick-fix
                      style={{ width: "80px" }}
                      percent={0}
                      size="default"
                      status="active"
                      showInfo={false}
                    />
                  )}
                </div>
              );
              return (
                <TabPane tab={tabTitle} key={tab}>
                  <TabContentComponent
                    next={tabs[tab].next}
                    back={tabs[tab].back}
                    prevTab={tabs[tab].prevTab}
                    nextTab={tabs[tab].nextTab}
                  />
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      </Layout>
    );
  }
}

export default ReportScreen;
