import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DropdownList from "../components/organisms/DropdownList";

configure({ adapter: new Adapter() });

describe("<DropdownList/>", () => {
  it("renders correctly", () => {
    const placeholder = "text";
    const options = ["item1", "item2"];
    const wrapper = shallow(
      <DropdownList placeholder={placeholder} options={options} />
    );
    const Select = wrapper.find("Styled(Select)");
    expect(Select.length).toBe(1);
    expect(Select.prop("placeholder")).toBe(placeholder);
    expect(Select.prop("showSearch")).toBeFalsy();
    expect(Select.find("Option").length).toBe(options.length);
  });
});
