// import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import Investigation from "../../../../components/environment/screens/Investigation";

configure({ adapter: new Adapter() });

describe("<Investigation/>", () => {
  it("renders correctly", () => {
    console.log("test");
  });
});
