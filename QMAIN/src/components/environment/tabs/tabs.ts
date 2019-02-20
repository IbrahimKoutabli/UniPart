import appRoutes from "../../../providers/AppRoutes";
import IncidentLogistics from "./IncidentLogistics";
import BasicDetails from "./BasicDetails";
import {
  RESOURCE_SLAC_REPORTS,
  RESOURCE_SLAC_REQUIREMENTS,
  ACCESS_LIST
} from "./permissions";
import MoreDetails from "./MoreDetails";
import ActivityLog from "./ActivityLog";
import Investigation from "./Investigation";

const tabs = {
  INCIDENT_TAB: {
    key: "Incident Logistics",
    path: appRoutes.incidentScreen,
    component: IncidentLogistics,
    inputs: 2,
    back: false,
    next: true,
    nextTab: appRoutes.basicDetailScreen,
    permissions: [`${RESOURCE_SLAC_REQUIREMENTS}:${ACCESS_LIST}`]
  },
  BASIC_DETAILS_TAB: {
    key: "Basic Details",
    path: appRoutes.basicDetailScreen,
    component: BasicDetails,
    inputs: 5,
    incidentType: ["Incident type 1", "Incident type 2"],
    categoryType: ["Category type 1", "Category type 2"],
    subCategoryType: ["Sub-Category type 1", "Sub-Category type 2"],
    locationType: ["Location type 1", "Location type 2"],
    contractType: ["Contract type 1", "Contract type 2"],
    siteType: ["Site type 1", "Site type 2"],
    back: true,
    next: true,
    prevTab: appRoutes.incidentScreen,
    nextTab: appRoutes.moreDetailScreen,
    permissions: [`${RESOURCE_SLAC_REPORTS}:${ACCESS_LIST}`]
  },
  MORE_DETAILS_TAB: {
    key: "More Details",
    path: appRoutes.moreDetailScreen,
    component: MoreDetails,
    inputs: 2,
    back: true,
    next: true,
    prevTab: appRoutes.basicDetailScreen,
    nextTab: appRoutes.activityScreen,
    permissions: [`${RESOURCE_SLAC_REPORTS}:${ACCESS_LIST}`]
  },
  ACTIVITY_TAB: {
    key: "Activity",
    path: appRoutes.activityScreen,
    component: ActivityLog,
    inputs: 0,
    back: true,
    next: true,
    prevTab: appRoutes.moreDetailScreen,
    nextTab: appRoutes.investigationScreen,
    permissions: [`${RESOURCE_SLAC_REPORTS}:${ACCESS_LIST}`]
  },
  INVESTIGATION_TAB: {
    key: "Investigation",
    path: appRoutes.investigationScreen,
    component: Investigation,
    inputs: 0,
    back: true,
    next: false,
    prevTab: appRoutes.activityScreen,
    permissions: [`${RESOURCE_SLAC_REPORTS}:${ACCESS_LIST}`]
  }
};

// type ApplyPermissionsTabs = (Array<string>) => typeof tabs;

// export const applyPermissionsTabs: ApplyPermissionsTabs = permissions =>
//     Object.keys(tabs)
//         .filter(tab => hasPermissions(tabs[tab].permissions, permissions))
//         .reduce((acc, key) => {
//             acc[key] = tabs[key];
//             return acc;
//         }, {});

export default tabs;
