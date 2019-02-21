import React from "react";
// import { Progress, Divider, DatePicker, TimePicker, Checkbox } from "antd";
// import Styled from "@emotion/styled";
import { Menu } from "antd";
// import { useTranslation } from "react-i18next";
// import NavigationButtons from "../../organisms/NavigationButtons";
// import Title from "../../organisms/Title";

interface Props {
  currentItem: string;
  history: string[];
}

const Item = Menu.Item;

const menuStyle = {
  paddingTop: "10px"
};

const UniPartMenu = (props: Props) => {
  return (
    <Menu
      theme="dark"
      style={menuStyle}
      defaultSelectedKeys={["title-of-report"]}
    >
      <Item key="1">Create a report</Item>
      <Item key="2" onClick={() => props.history.push("/view-reports")}>
        View Reports
      </Item>
    </Menu>
  );
};

export default UniPartMenu;
