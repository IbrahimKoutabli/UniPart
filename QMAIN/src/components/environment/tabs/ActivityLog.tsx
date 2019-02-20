import React from "react";

interface Props {
  details: any;
  progress(id: string, value: number): void;
}

const ActivityLog = (props: Props) => <div>Activity Log</div>;

export default ActivityLog;
