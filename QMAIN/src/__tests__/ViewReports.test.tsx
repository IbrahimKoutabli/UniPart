// import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import ViewReport from "../../../../components/environment/screens/ViewReport";

configure({ adapter: new Adapter() });

describe("<ViewReport/>", () => {
  it("renders correctly", () => {
    console.log("test");
  });
});
