import React from "react";
import Media from "react-media";
import styled from "@emotion/styled";
// import { FormattedMessage } from "react-intl";
import { Layout, Menu, Icon /*Button, Popconfirm */ } from "antd";
import { BrowserRouter } from "react-router-dom";

import App from "./components/environment/App";
import { Link } from "react-router-dom";
// interface Props {}

// interface State {}

// const Footer = styled(LayoutFooter)(`
//         padding: ${WebMetrics.defaultMetrics.noPadding};
// `);
const Container = styled(Layout)(`
        min-height: 100vh;
`);

// const App = styled('div')`
//     opacity: 0;
//     transition: opacity 1s ease-out;
//     &.application-mounted {
//         opacity: 1;
//     }
// `;

const { Header, Content, Sider } = Layout;
const menuStyle = {
  paddingTop: "10px"
};
const Item = Menu.Item;

const StyledItem = styled(Item)`
  background: rgb(20, 41, 61);
`;

export class AppsWrapper extends React.Component {
  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
  };

  renderSider = (isMatch: boolean) => {
    const width = isMatch ? 200 : 41;
    const collapsedWidth = isMatch ? 64 : 0;
    return (
      <Sider
        id="nav"
        breakpoint="lg"
        width={width}
        collapsedWidth={collapsedWidth}
        collapsible={true}
        collapsed={false}
        trigger={null}
        onCollapse={this.onCollapse}
      >
        <Menu
          theme="dark"
          style={menuStyle}
          defaultSelectedKeys={["title-of-report"]}
        >
          <StyledItem key="3">Logo</StyledItem>
          <Menu.Item key="2">
            <Link to="/create-report/incident">
              <Icon type="desktop" />
              <span>CREATE A REPORT</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="1">
            <Link to="/view-reports">
              <Icon type="pie-chart" />
              <span>VIEW REPORTS</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  };

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Media query={{ minWidth: "200px" }}>
            {isMatch => this.renderSider(isMatch)}
          </Media>

          <Container>
            <Header id="header">
              {/* <Popconfirm
                title="Are you sure you want to disconnect ?"
                placement="bottomRight"
                icon={
                  <Icon type="question-circle-o" style={{ color: "red" }} />
                }
              >
                <Button style={{ left: "95%" }}>Log out</Button>
              </Popconfirm> */}
            </Header>
            <Content>
              <App />
            </Content>
          </Container>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default AppsWrapper;
