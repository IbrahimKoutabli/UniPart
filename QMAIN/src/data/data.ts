import IncidentLogistics from "../components/environment/tabs/IncidentLogistics";
import BasicDetails from "../components/environment/tabs/BasicDetails";
import MoreDetails from "../components/environment/tabs/MoreDetails";
import ActivityLog from "../components/environment/tabs/ActivityLog";
import Investigation from "../components/environment/tabs/Investigation";

export const navbarItems = [
  {
    key: "title-of-report",
    title: "Title of Report",
    subtitle: "(IRN: Will autogenerate a number once saved)"
  }
];

export const tabs = [
  {
    title: "Incident Logistics",
    id: "incident-logistics",
    inputs: 2,
    back: false,
    next: true,
    component: IncidentLogistics
  },
  {
    title: "Basic Details",
    id: "basic-details",
    inputs: 8,
    back: true,
    next: true,
    component: BasicDetails
  },
  {
    title: "More Details",
    id: "more-details",
    inputs: 2,
    back: true,
    next: true,
    component: MoreDetails
  },
  {
    title: "Activity Log",
    id: "activity-log",
    inputs: 0,
    back: true,
    next: true,
    component: ActivityLog
  },
  {
    title: "Investigation",
    id: "investigation",
    inputs: 0,
    back: true,
    next: false,
    component: Investigation
  }
];
