import React from "react";
import { Switch, Icon } from "antd";
import Styled from "@emotion/styled";

const StyledText = Styled.span({
  marginRight: "10px"
});
const StyledSwitch = Styled(Switch)`
    width : 50px;
`;

interface Props {
  text: string;
  change?: any;
  checked?: any;
}

const toggleButton = (props: Props) => {
  const StyledContainer = Styled.div`
        display : flex;
        flex-direction : row;
    `;
  return (
    <StyledContainer>
      <StyledText>{props.text}</StyledText>
      <StyledSwitch
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="close" />}
        onChange={props.change}
        checked={props.checked}
      />
    </StyledContainer>
  );
};

export default toggleButton;
