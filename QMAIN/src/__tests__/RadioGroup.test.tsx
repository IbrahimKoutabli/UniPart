import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RadioGroup from "../components/organisms/RadioGroup";
import { reportStore } from "../store/report.store";

configure({ adapter: new Adapter() });

describe("<RadioGroup/>", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<RadioGroup reportStore={reportStore} />);
    const container = wrapper.find("Styled(RadioGroup)");
    expect(container.length).toBe(1);
    expect(container.prop("disabled")).toBeFalsy();
    expect(container.children().length).toBe(2);
    expect(container.find("Radio").length).toBe(2);
  });
});
