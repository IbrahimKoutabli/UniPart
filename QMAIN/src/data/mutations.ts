import gql from "graphql-tag";
import client from "../apollo/client";

const CREATE_REPORT = gql`
  mutation AddIncident($incident: RequiredIncidentInput!) {
    addIncident(Incident: $in)
  }
`;

const validateGraphQLResult = (result: any) => {
  if (result.errors && result.errors.length) {
    throw result.errors;
  }
};

interface ReportFormType {
  safe: boolean;
}
export const createReportFormMutation = async (reportForm: ReportFormType) => {
  const result = await client.mutate({
    mutation: CREATE_REPORT,
    variables: { incident: reportForm }
  });

  validateGraphQLResult(result);
  return result.data;
};
