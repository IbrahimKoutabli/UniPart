import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../components/environment/App";

configure({ adapter: new Adapter() });

describe("<App/>", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<App />);
    const Provider = wrapper.find("Provider");
    expect(Provider.children().length).toBe(1);
    const BrowserRouter = Provider.find("BrowserRouter");
    expect(BrowserRouter.children().length).toBe(0);
    const Switch = Provider.find("Switch");
    expect(Switch.children().length).toBe(7);
    const Route = Switch.find("Route");
    expect(Route.length).toBe(6);
    const Redirect = Switch.find("Redirect");
    expect(Redirect.length).toBe(1);
  });
});
