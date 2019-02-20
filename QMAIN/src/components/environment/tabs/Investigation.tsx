import React from "react";

interface Props {
  details: any;
  progress(id: string, value: number): void;
}

const Investigation = (props: Props) => <div>Investigations</div>;

export default Investigation;
