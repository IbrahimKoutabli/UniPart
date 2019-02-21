import React from "react";
import { Progress, Divider, Input } from "antd";
import { Icon, AutoComplete } from "antd";

import { observer, inject } from "mobx-react";
import { configure } from "mobx";
import Title from "../../organisms/Title";
import ToggleButton from "../../organisms/ToggleButton";
import NavigationButtons from "../../organisms/NavigationButtons";
configure({ enforceActions: "observed" });

interface Props {
  details: any;
  progress: number;
  changeProgress(id: string, value: number): void;
  nextTab: string;
  prevTab: string;
  next: boolean;
  back: boolean;
  reportStore: any;
}

// interface State {
//   input: any[];
// }

@inject("reportStore")
@observer
export default class MoreDetails extends React.Component<Props> {

  dataSource = ["Investigator 1", "Investigator 2", "Investigator 3"]; // should be moved to data
  dataSource1 = ["Reportee 1", "Reportee 2", "Reportee 3"];

  setSeverity = () => this.props.reportStore.moreDetails.setSeverity();
  setLight = () => this.props.reportStore.moreDetails.setBlueLight();
  setPersonInjury = () => this.props.reportStore.moreDetails.setPersonInjury();
  setFirstAid = () => this.props.reportStore.moreDetails.setFirstAid();
  setFitToWork = () => this.props.reportStore.moreDetails.setFitToWork();

  render() {
    const { TextArea } = Input;
    const { reportStore } = this.props;
    return (
      <div>
        <Progress
          style={{ padding: "20px" }}
          percent={reportStore.moreDetails.getProgress}
          size="default"
          status="active"
        />
        <Divider style={{ backgroundColor: "lightgrey" }} />
        <div
          style={{ display: "flex", flexDirection: "column", padding: "20px" }}
        >
          <Title text="More details" />
          <div style={{ display: "flex", marginBottom: "70px" }}>
            <AutoComplete
              placeholder="Investigator"
              dropdownStyle={{ width: 300 }}
              style={{ width: 300 }}
              dataSource={this.dataSource}
              onSelect={val => reportStore.moreDetails.setInvestigator(val)}
              value={reportStore.moreDetails.investigator[0]}
            >
              <Input
                suffix={
                  <Icon type="search" className="certain-category-icon" />
                }
              />
            </AutoComplete>

            <AutoComplete
              placeholder="Who was the incident reported to?"
              dropdownStyle={{ width: 300 }}
              style={{ width: 300, marginLeft: 30 }}
              dataSource={this.dataSource1}
              onSelect={val => reportStore.moreDetails.setReportee(val)}
              value={reportStore.moreDetails.reportee[0]}
            >
              <Input
                suffix={
                  <Icon type="search" className="certain-category-icon" />
                }
              />
            </AutoComplete>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ToggleButton
              text="Blue light ?"
              // direction="row"
              change={this.setLight}
              checked={reportStore.moreDetails.getBlueLight}
            />
            <ToggleButton
              text="Potential for greater severity ?"
              // direction="row"
              change={this.setSeverity}
              checked={reportStore.moreDetails.greaterSeverity}
            />
            <ToggleButton
              text="Person injured ?"
              change={this.setPersonInjury}
              checked={reportStore.moreDetails.personInjured}
            />
            <ToggleButton
              text="Person treated by first aider ?"
              change={this.setFirstAid}
              checked={reportStore.moreDetails.treatedAider}
            />
            <ToggleButton
              change={this.setFitToWork}
              checked={reportStore.moreDetails.fitToWork}
              text="Person fit to return to work ?"
              // direction="column"
            />
          </div>
        </div>
        <br />
        <TextArea rows={4} placeholder="Immediate actions required ?" />
        <Divider style={{ backgroundColor: "lightgrey" }} />
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
