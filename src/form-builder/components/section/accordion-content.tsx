import React from "react";
import _ from "lodash";

interface Props {
  children: any;
  title: string;
  name: string;
}

const AccordionContentSection = (props: Props) => {
  const { children } = props;

  return <div className="accordion-content">{children}</div>;
};

export default AccordionContentSection;
