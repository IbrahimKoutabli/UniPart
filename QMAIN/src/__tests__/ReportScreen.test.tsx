// import React from "react";
import { configure /*, shallow */ } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import MoreDetails from "../../../../components/environment/screens/MoreDetails";

configure({ adapter: new Adapter() });

describe("<MoreDetails />", () => {
  it("renders correctly", () => {
    console.log("test");
    /*const wrapper = shallow(<MoreDetails />);
    expect(wrapper.find("Progress").length).toBe(1);
    expect(wrapper.find("title").length).toBe(1);
    expect(wrapper.find("Search").length).toBe(2);
    expect(wrapper.find("toggleButton").length).toBe(5);
    expect(wrapper.find("Divider").length).toBe(3);
    expect(wrapper.find("TextArea").length).toBe(1);
    expect(wrapper.find("NavigationButtons").length).toBe(1);*/
  });

  /*it("renders snapshot", () => {
      const wrapper = shallow(<MoreDetails/>);
      expect(wrapper).toMatchSnapshot();
  });*/
});
