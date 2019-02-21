import React from "react";
import { Button, Modal } from "antd";
import styled from "@emotion/styled";
import { observer, inject } from "mobx-react";
import { configure } from "mobx";
import { createReportFormMutation } from "../../../data/mutations";
import client from "../../../apollo/client";
import CurrentReportStatus from "../../organisms/CurrentReportStatus";

configure({ enforceActions: "observed" });

interface Props {
  title: string;
  subTitle: string;
  btns?: string;
  reportStore?: any;
  complete?: any;
}

const HeaderStyle = styled.div({
  height: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
});

const TitleStyle = styled.div({
  padding: "15px",
  lineHeight: "1.1em"
});

const ButtonStyle = styled.div({
  padding: "0px 10px",
  display: "flex",
  alignItems: "center"
});

const completeHandler = async () => {
  const addReportData = {
    safe: false
  };
  try {
    await createReportFormMutation(addReportData);
    // onDismissModal();

    // notification.success({
    //   message: t("notificationSuccessTitle"),
    //   description: t(`Requirement successfully created`)
    // });

    await client.reFetchObservableQueries();
  } catch (error) {
    // notification.error({
    //   message: t("notificationErrorTitle"),
    //   description: t("Error creating requirement")
    // });
    console.log("ERROR POSTING");
  }
};

@inject("reportStore")
@observer
export default class Title extends React.Component<Props> {
  handleOk = () => {
    // this.setState({
    //   ModalText: 'Trying to connect to database',
    //   confirmLoading: true,
    // });
    completeHandler();
    // setTimeout(() => {
    //   this.setState({
    //     visible: false,
    //     confirmLoading: false,
    //   });
    // }, 2000);
  };

  handleCancel = () => {
    this.props.reportStore.setVisible();
  };

  showModal = () => {
    this.props.reportStore.setVisible();
  };

  render() {
    const { reportStore } = this.props;
    const inProgress = reportStore.getTotalProgress;
    return (
      <HeaderStyle>
        <TitleStyle>
          <span style={{ fontSize: "22px" }}>{this.props.title}</span>
          <p>{this.props.subTitle}</p>
        </TitleStyle>
        <ButtonStyle>
          <Button style={{ margin: "0px 5px" }} disabled={true}>
            Save
          </Button>
          <div>
            <Button
              type="primary"
              style={{ margin: "0px 5px" }}
              disabled={inProgress}
              onClick={this.showModal}
            >
              Complete
            </Button>
            <Modal
              title="Create a report"
              visible={this.props.reportStore.visible}
              onOk={this.handleOk}
              confirmLoading={false}
              onCancel={this.handleCancel}
            >
              <CurrentReportStatus />
            </Modal>
          </div>
        </ButtonStyle>
      </HeaderStyle>
    );
  }
}
