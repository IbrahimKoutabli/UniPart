const rootPath = '/create-report';

const incidentScreen = `${rootPath}/incident`;
const basicDetailScreen = `${rootPath}/basic-details`;
const moreDetailScreen =  `${rootPath}/more-details`;
const activityScreen =  `${rootPath}/activity`;
const investigationScreen =  `${rootPath}/investigation`;
const viewReportScreen = `/view-reports`;

const appRoutes = {
    investigationScreen,
    activityScreen,
    moreDetailScreen,
    basicDetailScreen,
    incidentScreen,
    viewReportScreen,
    rootPath,
};

export default appRoutes;
