import React, { Component } from "react";
import Styled from "@emotion/styled";
import { Button, Modal } from "antd";
import { withRouter, RouteComponentProps } from "react-router-dom";
// import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { ReportStore } from "../../store/report.store";

interface NavigationProps extends RouteComponentProps {
  next: boolean;
  back: boolean;
  nextTab: string;
  prevTab: string;
  reportStore?: ReportStore;
}

interface State {
  showCancel: boolean;
  showReset: boolean;
}
// interface TodoAddProps {
//   reportStore?: ReportStore
// }

const StyledContainer = Styled.div({
  padding: "20px"
});

@inject("reportStore")
@observer
class NavigationButtons extends Component<NavigationProps, State> {
  // @observable private incident: Incident;
  state = {
    showCancel: false,
    showReset: false
  };
  handleAddTodo = () => {
    // this.props.reportStore.addTodo({id:"bob",date:"j",time:"e"})
    // this.incident = ''
  };
  navigateTo = (url: string) => {
    const { history } = this.props;
    history.push(url);
  };
  cancel = () => {
    Modal.confirm({
      title: "Do you Want to cancel ?",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  reset = (store: any) => {
    const path = this.props.location.pathname;
    Modal.confirm({
      title: "Are you sure you want to reset ?",
      onOk() {
        store.resetTab(path);
      },
      onCancel() {
        // store.resetStateIncident();
        // store.resetStateDetails();
        // store.resetStateMoreDetails();
      }
    });
  };
  render() {
    return (
      <StyledContainer>
        <Button
          style={{ margin: "5px" }}
          type="primary"
          disabled={true}
          onClick={this.handleAddTodo}
        >
          Save
        </Button>
        <Button style={{ margin: "5px" }} onClick={this.cancel} disabled={true}>
          Cancel
        </Button>
        <Button
          style={{ margin: "5px" }}
          onClick={() => this.reset(this.props.reportStore)}
        >
          Reset
        </Button>
        <Button
          style={{ margin: "5px" }}
          disabled={!this.props.back}
          onClick={() => this.navigateTo(this.props.prevTab)}
        >
          Back
        </Button>
        <Button
          style={{ margin: "5px" }}
          disabled={!this.props.next}
          onClick={() => this.navigateTo(this.props.nextTab)}
        >
          Next
        </Button>
      </StyledContainer>
    );
  }
}

export default withRouter(NavigationButtons);
