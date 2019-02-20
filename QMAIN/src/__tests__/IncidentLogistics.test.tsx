import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import IncidentLogistics from "../components/environment/tabs/IncidentLogistics";
import { reportStore } from "../store/report.store";

configure({ adapter: new Adapter() });

describe("<IncidentLogistics />", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <IncidentLogistics
        reportStore={reportStore}
        nextTab="next"
        prevTab="prev"
        next={false}
        back={false}
        checked={false}
        progress={0}
      />
    );
    expect(wrapper.find("Progress").length).toBe(1);
    expect(wrapper.find("Styled(Divider)").length).toBe(2);
    expect(wrapper.find("title").length).toBe(1);
    expect(wrapper.find("PickerWrapper").length).toBe(1); /*DatePicker*/
    expect(wrapper.find("TimePicker").length).toBe(1);
    expect(wrapper.find("Checkbox").length).toBe(1);
    expect(wrapper.find("NavigationButtons").length).toBe(1);
  }),
    it("tests the progress bar with DatePicker", () => {
      const date: [string, number] = ["2019-02-18", 50];
      reportStore.incidentDetails.date = date;
      const wrapper = shallow(
        <IncidentLogistics
          reportStore={reportStore}
          nextTab="next"
          prevTab="prev"
          next={false}
          back={false}
          checked={false}
          progress={0}
        />
      );
      const DatePicker = wrapper.find("PickerWrapper");
      DatePicker.simulate("change");
      expect(DatePicker).not.toEqual(date);
    });

  it("tests the progress bar with TimePicker", () => {
    const time: [string, number] = ["03:11", 50];
    const wrapper = shallow(
      <IncidentLogistics
        reportStore={reportStore}
        nextTab="next"
        prevTab="prev"
        next={false}
        back={false}
        checked={false}
        progress={0}
      />
    );
    const TimePicker = wrapper.find("TimePicker");
    TimePicker.simulate("change");
    expect(TimePicker).not.toEqual(time);
  }),
    it("renders snapshots", () => {
      const wrapper = shallow(
        <IncidentLogistics
          nextTab="next"
          prevTab="prev"
          next={false}
          back={false}
          checked={false}
          progress={0}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

  /*it('renders snapshots', () => {
        const wrapper = shallow(<IncidentLogistics/>);
        expect(wrapper).toMatchSnapshot();
    })*/
});
