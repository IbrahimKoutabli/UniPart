import React from "react";
import { Select } from "antd";
import Styled from "@emotion/styled";

const DropdownList = Styled(Select)`
    width : 300px;
`;

interface Props {
  placeholder: string;
  options: string[];
  changeProgress?: () => void;
}

const dropdownList = (props: Props) => {
  const Option = Select.Option;
  const options = props.options.map((text, index) => {
    return (
      <Option key={index.toString()} value={index}>
        {text}
      </Option>
    );
  });
  return (
    <DropdownList
      placeholder={props.placeholder}
      onChange={props.changeProgress}
    >
      {options}
    </DropdownList>
  );
};

export default dropdownList;
