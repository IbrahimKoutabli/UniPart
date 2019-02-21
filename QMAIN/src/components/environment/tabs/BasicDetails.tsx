import React from "react";
import { Progress, Divider, Input, AutoComplete } from "antd";
import Styled from "@emotion/styled";
import { observer, inject } from "mobx-react";
import { configure } from "mobx";
// import { FormattedMessage} from 'react-intl';
import NavigationButtons from "../../organisms/NavigationButtons";
import Title from "../../organisms/Title";
// import DropdownList from "../../organisms/DropdownList";
import DropdownList1 from "../../organisms/DropdownList1";
import RadioGroup from "../../organisms/RadioGroup";
import ToggleButton from "../../organisms/ToggleButton";
// import { reportStore } from "src/store/report.store";

import tabs from "../tabs/tabs";

configure({ enforceActions: true });

const StyledDivider = Styled(Divider)`
  	background : lightgrey;
`;
const InputsContainer = Styled.div({
  display: "flex",
  flexDirection: "column",
  padding: "20px"
});
const InnerContainer = Styled.div({
  display: "flex",
  justifyContent: "space-between"
});
const DropdownListContainer = Styled.div({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "40px"
});

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

@inject("reportStore")
@observer
export default class BasicDetails extends React.Component<Props> {
 state = {
        name       : 'Eric',
        unreadCount: 1000,
    };

  handleChangeIncident = (value: any) =>
    this.props.reportStore.basicDetails.setIncidentType(value);

  handleChangeCategory = (value: any) =>
    this.props.reportStore.basicDetails.setCategoryHandler(value);

  handleChangeSubCategory = (value: any) =>
    this.props.reportStore.basicDetails.setSubCategoryHandler(value);

  handleChangeSite = (value: any) =>
    this.props.reportStore.basicDetails.setSiteHandler(value);

  handleChangeContract = (value: any) =>
    this.props.reportStore.basicDetails.setContractHandler(value);

  handleChangeLocation = (value: any) =>
    this.props.reportStore.basicDetails.setLocationHandler(value);

  handleWorkSafety = () => this.props.reportStore.basicDetails.setWorkSafety();

  handleSearch = (value: string) => console.log("val", value);

  handleSelect = (
    identifier: string,
    option: { props: { text: string; type: string } }
  ) => {
    console.log( identifier, option);
  };

  render() {
    const Search = Input.Search;
    const { TextArea } = Input;
    const { reportStore } = this.props;
    return (
      <div>
        <Progress
          style={{ padding: "20px" }}
          percent={reportStore.basicDetails.getProgress}
          size="default"
          status="active"
        />
        <StyledDivider />
        <InputsContainer>
          <Title text="Basic details" />
          <InnerContainer>
            <RadioGroup /*select={reportStore.setRadio*/ />
            <DropdownList1
              placeholder="Incident type"
              options={tabs.BASIC_DETAILS_TAB.incidentType}
              selected={reportStore.basicDetails.incidentType[0]}
              handler={(val: any) =>
                reportStore.basicDetails.setIncidentType(val)
              }
            />
          </InnerContainer>
          <DropdownListContainer>
            <DropdownList1
              selected={reportStore.basicDetails.categoryType[0]}
              options={tabs.BASIC_DETAILS_TAB.categoryType}
              placeholder="Category"
              handler={(val: any) =>
                reportStore.basicDetails.setCategoryHandler(val)
              }
            />
            <DropdownList1
              selected={reportStore.basicDetails.subCategoryType[0]}
              handler={(val: any) =>
                reportStore.basicDetails.setSubCategoryHandler(val)
              }
              placeholder="Sub-Category"
              options={tabs.BASIC_DETAILS_TAB.subCategoryType}
            />
          </DropdownListContainer>
        </InputsContainer>
        <StyledDivider />
        <InputsContainer>
          <InnerContainer>
            <AutoComplete
              dataSource={tabs.BASIC_DETAILS_TAB.siteType}
              style={{ width: 300 }}
              placeholder="Site"
              onSelect={this.handleSelect}
              onSearch={this.handleSearch}
              disabled={true}
              // onChange={this.props.onChange}
            >
              <Search />
            </AutoComplete>
            <Search
              placeholder="Contract"
              style={{ width: 300 }}
              disabled={true}
            />
          </InnerContainer>
          <DropdownListContainer>
            <DropdownList1
              selected={reportStore.basicDetails.locationType[0]}
              handler={(val: any) =>
                reportStore.basicDetails.setLocationHandler(val)
              }
              placeholder="Location"
              options={tabs.BASIC_DETAILS_TAB.locationType}
            />
            
            <TextArea
              style={{ width: "300px" }}
              rows={4}
              placeholder="Location description"
              // onChange={event => {
              //   this.progressHandler(
              //     this.updateInput("location", event.target.value.length),
              //     false,
              //     false,
              //     ""
              //   );
              // }}
            />
          </DropdownListContainer>
          <br />
          <div style={{ display: "flex" }}>
            <ToggleButton
              text="Incident area safe to return to work ?"
              change={this.handleWorkSafety}
              checked={this.props.reportStore.basicDetails.getWorkSatefy}
            />
          </div>
          <StyledDivider />
          <NavigationButtons
            next={this.props.next}
            back={this.props.back}
            nextTab={this.props.nextTab}
            prevTab={this.props.prevTab}
          />
        </InputsContainer>
      </div>
    );
  }
}
