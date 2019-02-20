import React from 'react';
import ReportScreen from "../components/environment/screens/ReportScreen";

const incidentScreen = (props: any) =>  <ReportScreen {...props} currentItem="title-of-report" />;
const detailScreen = (props: any) =>  <ReportScreen {...props} currentItem="title-of-report" />;
const moreDetailScreen = (props: any) =>  <ReportScreen {...props} currentItem="title-of-report" />;
const activityScreen = (props: any) =>  <ReportScreen {...props} currentItem="title-of-report" />;
const investigationScreen = (props: any) =>  <ReportScreen {...props} currentItem="title-of-report" />;

const appComponents = {
    incidentScreen,
    detailScreen,
    activityScreen,
    moreDetailScreen,
    investigationScreen
};

export default appComponents;
