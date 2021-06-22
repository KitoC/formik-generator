import React from "react";
import _ from "lodash";

interface Props {
  children: any;
  title: string;
  name: string;
}

const BasicSection = (props: Props) => {
  const { children, title, name } = props;

  return (
    <div className="section">
      <h2 className="section-header">{title || _.startCase(name)}</h2>
      <div>{children}</div>
    </div>
  );
};

export default BasicSection;
