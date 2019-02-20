import React from "react";
import {
  Progress,
  Divider,
  DatePicker,
  TimePicker,
  Checkbox,
  Input
} from "antd";
import Styled from "@emotion/styled";
import { observer, inject } from "mobx-react";
import { configure } from "mobx";
import { FormattedMessage } from "react-intl";
// import TextArea from "antd/lib/input/TextArea";
import NavigationButtons from "../../organisms/NavigationButtons";
import Title from "../../organisms/Title";
configure({ enforceActions: "observed" });

const { TextArea } = Input;
interface Props {
  progress: number;
  nextTab: string;
  prevTab: string;
  checked: boolean;
  reportStore?: any;
  next: boolean;
  back: boolean;
}

const StyledDivider = Styled(Divider)`
  	background : lightgrey;
`;
const InputsContainer = Styled.div({
  display: "flex",
  flexDirection: "column",
  padding: "20px"
});
const TimeInputs = Styled.div({
  display: "flex"
});

@inject("reportStore")
@observer
export default class IncidentLogistics extends React.Component<Props> {
  checkBoxHandler = () => {
    this.props.reportStore.incidentDetails.checkBoxIncident();
  };
  dateChange = (date: any, dateString: any) => {
    this.props.reportStore.incidentDetails.dateOfIncident(dateString);
  };

  timeChange = (time: any, timeString: any) => {
    this.props.reportStore.incidentDetails.timeOfIncident(timeString);
  };

  render() {
    const { reportStore } = this.props;
    return (
      <div>
        <Progress
          style={{ padding: "20px" }}
          percent={reportStore.incidentDetails.getProgress}
          size="default"
          status="active"
        />
        <StyledDivider />
        <InputsContainer>
          <Title text="Incident logistics" />
          <TimeInputs>
            <DatePicker // once clicked, no easy way to clear other than manually clicking X
              style={{ margin: "10px" }}
              placeholder="Date of incident"
              onChange={this.dateChange}
            />
            <TimePicker // once clicked, no easy way to clear other than manually clicking X
              style={{ margin: "10px", width: "150px" }}
              placeholder="Time of incident"
              format={"HH:mm"}
              onChange={this.timeChange}
            />
          </TimeInputs>
          <br />
          <Checkbox
            checked={reportStore.incidentDetails.late}
            onChange={() => this.checkBoxHandler()}
          >
            <FormattedMessage
              id="app.logistics.late"
              defaultMessage={`Reported late?`}
            />
          </Checkbox>
          {reportStore.incidentDetails.late ? (
            <TextArea
              style={{ marginTop: "15px" }}
              rows={4}
              placeholder="Reason for being late ?"
            />
          ) : null}
        </InputsContainer>
        <StyledDivider />
        <NavigationButtons
          next={this.props.next}
          back={this.props.back}
          nextTab={this.props.nextTab}
          prevTab={this.props.prevTab}
        />
      </div>
    );
  }
}
