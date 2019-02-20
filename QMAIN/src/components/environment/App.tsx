import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "mobx-react";

import { ReportStore } from "../../store/report.store";
import ViewReports from "./screens/ViewReports";
// import Locale from "../provider/Locale";
import appRoutes from "../../providers/AppRoutes";
import ReportScreen from "../environment/screens/ReportScreen";

class App extends React.Component {
  private reportStore: ReportStore = new ReportStore();
  render() {
    return (
      // <Theme>
      // <Locale>
      <Provider reportStore={this.reportStore}>
        <Switch>
          <Route
            exact={true}
            path={appRoutes.incidentScreen}
            render={(props: any) => (
              <ReportScreen {...props} currentTab="INCIDENT_TAB" />
            )}
          />
          <Route
            exact={true}
            path={appRoutes.basicDetailScreen}
            render={(props: any) => (
              <ReportScreen {...props} currentTab="BASIC_DETAILS_TAB" />
            )}
          />
          <Route
            exact={true}
            path={appRoutes.moreDetailScreen}
            render={(props: any) => (
              <ReportScreen {...props} currentTab="MORE_DETAILS_TAB" />
            )}
          />
          <Route
            exact={true}
            path={appRoutes.activityScreen}
            render={(props: any) => (
              <ReportScreen {...props} currentTab="ACTIVITY_TAB" />
            )}
          />
          <Route
            exact={true}
            path={appRoutes.investigationScreen}
            render={(props: any) => (
              <ReportScreen {...props} currentTab="INVESTIGATION_TAB" />
            )}
          />
          <Route
            exact={true}
            path={appRoutes.viewReportScreen}
            render={(props: any) => <ViewReports {...props} />}
          />
          <Redirect from="/" to={appRoutes.incidentScreen} />
        </Switch>
      </Provider>
      // </Locale>
      // </Theme>
    );
  }
}

export default App;
