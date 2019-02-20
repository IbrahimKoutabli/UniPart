// import React from "react";
import { configure /* shallow */ } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import BasicDetails from "../../../../components/environment/screens/BasicDetails";

configure({ adapter: new Adapter() });

describe("<BasicDetails />", () => {
  it("renders correctly", () => {
    /*const wrapper = shallow(<BasicDetails />);
    expect(wrapper.find("Progress").length).toBe(1);
    const elements = wrapper.find("Styled(div)");
    expect(elements.length).toBe(6);
    
    const title = elements.at(0);
    expect(title.children().length).toBe(3);
    expect(title.find("title").length).toBe(1);
    
    const titleTop = elements.at(1);
    expect(titleTop.children().length).toBe(2);
    expect(titleTop.find("radioGroup").length).toBe(1);
    expect(titleTop.find("dropdownList").length).toBe(1);
    
    const titleBottom = elements.at(2);
    expect(titleBottom.children().length).toBe(2);
    expect(titleBottom.find("dropdownList").length).toBe(2);
    
    const bottom = elements.at(3);
    expect(bottom.children().length).toBe(6);
    expect(bottom.find("toggleButton").length).toBe(1);
    expect(bottom.find("Styled(Divider)").length).toBe(1);
    expect(bottom.find("NavigationButtons").length).toBe(1);
    
    const bottomSearch = elements.at(4);
    expect(bottomSearch.children().length).toBe(2);
    expect(bottomSearch.find("Search").length).toBe(2);
    
    const bottomDropdownText = elements.at(5);
    expect(bottomDropdownText.children().length).toBe(2);
    expect(bottomDropdownText.find("TextArea").length).toBe(1);
    expect(bottomDropdownText.find("dropdownList").length).toBe(1);*/
  });

  /*it("renders snapshot", () => {
    const wrapper = shallow(<BasicDetails />);
    expect(wrapper).toMatchSnapshot();
  })*/
});
