import React from "react";
// import Styled from "@emotion/styled";
// import i18next from "i18next";
// import { useTranslation } from "react-i18next";

import styled from "@emotion/styled";

import { Table, Collapse } from "antd";
import { data, columns } from "../../../data/tableData";

const Text = styled.div({
  width: "200px"
});

const ViewReports = () => {
  const Panel = Collapse.Panel;

  const viewAllData = (record: any) => {
    return (
      <Collapse bordered={false}>
        <Panel key="1" header="Basic details">
          <div style={{ display: "flex" }}>
            <div>
              <Text>
                environmental :{" "}
                {record.basicDetails.environmental ? "Yes" : "No"}
              </Text>
              <Text>incidentType : {record.basicDetails.incidentType}</Text>
              <Text>category : {record.basicDetails.category}</Text>
              <Text>subCategory : {record.basicDetails.subCategory}</Text>
            </div>
            <div>
              <Text>site : {record.basicDetails.site.site}</Text>
              <Text>contract : {record.basicDetails.site.contract}</Text>
              <Text>subCategory : {record.basicDetails.site.subCategory}</Text>
              <Text>
                locationDescription :{" "}
                {record.basicDetails.site.locationDescription}
              </Text>
              <Text>
                safeToReturn :{" "}
                {record.basicDetails.site.safeToReturn ? "Yes" : "No"}
              </Text>
            </div>
          </div>
        </Panel>
        <Panel key="2" header="More details">
          {Object.keys(record.moreDetails).map((text, index) => {
            return (
              <Text key={index}>
                {text} :{" "}
                {typeof record.moreDetails[text] === "boolean"
                  ? record.moreDetails[text]
                    ? "Yes"
                    : "No"
                  : record.moreDetails[text]}
              </Text>
            );
          })}
        </Panel>
      </Collapse>
    );
  };
  return (
    <Table
      style={{ padding: "30px" }}
      columns={columns}
      dataSource={data}
      pagination={false}
      expandedRowRender={viewAllData}
    />
  );
};

export default ViewReports;
