import React from "react";
import { AutoComplete, Input, Icon } from "antd";
import Styled from "@emotion/styled";
import { observer, inject } from "mobx-react";
import { configure } from "mobx";
configure({ enforceActions: true });

const DropdownList = Styled(AutoComplete)`
    width : 300px;
`;

interface Props {
  placeholder: string;
  options: string[];
  changeProgress?: any;
  selected?: any;
  onChange?: any;
  reportStore?: any;
  handler?: any;
}

@inject("reportStore")
@observer
export default class DropdownList1 extends React.Component<Props> {
  handleWorkSafety = () => this.props.reportStore.basicDetails.setWorkSafety();

  render() {
    // const Option = Select.Option;
    // console.log("WADAS??!", this.props.reportStore.basicDetails.incidentType)
    // const options = this.props.options.map((text, index) => {
    //   return (
    //     <Option key={index.toString()} value={index}>
    //       {text}
    //     </Option>
    //   );
    // });
    return (
      <DropdownList
        placeholder={this.props.placeholder}
        dropdownStyle={{ width: 300 }}
        style={{ width: 300 }}
        dataSource={this.props.options}
        onSelect={val =>
          this.props.handler(val)
        }
        value={this.props.selected}
      >
        <Input suffix={<Icon type="down" />} />
      </DropdownList>
    );
  }
}
