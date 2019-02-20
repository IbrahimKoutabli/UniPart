import React from "react";
import { Progress } from "antd";
import styled from "@emotion/styled";

interface Props {
  title: string;
  visible: boolean;
  progress: number;
}

const TitleStyle = styled.div({
  display: "flex",
  flexDirection: "column"
});

const tabTitle = (props: Props) => {
  return (
    <TitleStyle>
      <span>{props.title}</span>
      {!props.visible ? (
        <Progress percent={props.progress} showInfo={false} />
      ) : null}
    </TitleStyle>
  );
};

export default tabTitle;
