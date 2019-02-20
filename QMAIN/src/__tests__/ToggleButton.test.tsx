import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ToggleButton from "../components/organisms/ToggleButton";

configure({ adapter: new Adapter() });

describe("<ToggleButton/>", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<ToggleButton text="text" />);
    const span = wrapper.find("Styled(span)");
    expect(span.length).toBe(1);
    expect(span.children().length).toBe(1);
    expect(span.children().text()).toBe("text");
    expect(wrapper.find("Styled(Switch)").length).toBe(1);
  });
});
