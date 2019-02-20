// import React from "react";
import { configure /*, shallow*/ } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import UniPartMenu from "../../../../components/environment/screens/UniPartMenu";

configure({ adapter: new Adapter() });

describe("<UniPartMenu />", () => {
  it("renders correctly", () => {
    console.log("test");
    /*const wrapper = shallow(<UniPartMenu />);
    const Menu = wrapper.find("Menu");
    expect(Menu.length).toBe(1);
    expect(Menu.children()).not.toBeFalsy();
    expect(Menu.find("MenuItem")).not.toBeFalsy();*/
  });
});
