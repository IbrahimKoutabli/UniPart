import React from "react";
// import { Progress, Divider, DatePicker, TimePicker, Checkbox } from "antd";
// import Styled from "@emotion/styled";
// import i18next from "i18next";
// import { useTranslation } from "react-i18next";
// import NavigationButtons from "../../organisms/NavigationButtons";
// import Title from "../../organisms/Title";
// import TextArea from "antd/lib/input/TextArea";
import styled from "@emotion/styled";
import { observer, inject } from "mobx-react";
import { configure } from "mobx";

import { /*Table*/ Collapse } from "antd";
// import { data, columns } from '../../../data/tableData'
configure({ enforceActions: "observed" });




const Text = styled.div({
  width: "200px"
});

interface Props {
  reportStore?: any;
}
@inject("reportStore")
@observer
export default class CurrentReportStatus extends React.Component<Props>{
  render(){
  const Panel = Collapse.Panel;
console.log("COMPLETION", this.props)
const {reportStore} = this.props
    return (
      <div>
        Incident on: {this.props.reportStore.incidentDetails.date[0]}
        <span style={{marginLeft:'20px'}}>At: {this.props.reportStore.incidentDetails.date[0]}</span>
      <Collapse bordered={false}>
        <Panel key="1" header="Basic details">
          <div style={{ display: "flex" }}>
            <div>
              <Text>
                environmental :{" "}
                {this.props.reportStore.basicDetails.environmental ? "Yes" : "No"}
              </Text>
              <Text>incidentType : {this.props.reportStore.basicDetails.incidentType[0]}</Text>
              <Text>category : {this.props.reportStore.basicDetails.categoryType[0]}</Text>
              <Text>subCategory : {this.props.reportStore.basicDetails.subCategoryType[0]}</Text>
            </div>
            <div>
              <Text>site : N/A</Text>
              <Text>contract : N/A</Text>

              <Text>
                safeToReturn :{" "}
                {this.props.reportStore.basicDetails.workSafety ? "Yes" : "No"}
              </Text>
            </div>
          </div>
        </Panel>
        <Panel key="2" header="More Details">
          {
            <div>
                <div>
                  Investigator: {reportStore.moreDetails.investigator[0]}
                  <span style={{marginLeft:'20px'}}>Reported to: {reportStore.moreDetails.reportee[0]}</span>
              <Text>
                Blue light: {reportStore.moreDetails.blueLight ? "Yes" : "No"}
              </Text>
              <Text>Potential for severity: {reportStore.moreDetails.greaterSeverity ? "Yes" : "No"}</Text>
              <Text>Person injured: {reportStore.moreDetails.personInjured ? "Yes" : "No"}</Text>
              <Text>Person treated: {reportStore.moreDetails.treatedAider ? "Yes" : "No"}</Text>
            </div>
            <div>
              <Text>Person fit to work: {reportStore.moreDetails.fitToWork ? "Yes" : "No"}</Text>
            </div>
            </div>
          }
        </Panel>
      </Collapse>
      </div>
    )
  }
}
