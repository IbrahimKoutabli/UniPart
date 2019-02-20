import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationButtons from "../components/organisms/NavigationButtons";

configure({ adapter: new Adapter() });

describe("<NavigationButtons/>", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <NavigationButtons
        nextTab="next"
        prevTab="prev"
        next={false}
        back={false}
      />
    );
    const container = wrapper.find("Styled.div");
    expect(container.length).toBe(1);
    expect(container.children().length).toBe(5);
    expect(container.find("Button").length).toBe(5);
  });
});
