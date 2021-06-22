import React from "react";
import _ from "lodash";
import { useFormikContext } from "formik";

import { Field } from "../../form-builder.types";
import clsx from "clsx";
import useStepper, { StepOption } from "../utils/useStepper";
import { useFormGenerator } from "../../FormGeneratorContext";

interface ItemProps extends StepOption {}
interface Props {
  schema: Field[];
  children: any;
  formId: any;
  name: string;
  title: string;
}

const AccordionItem = (props: ItemProps) => {
  const { title, isActive, setActive, component, fields } = props;

  const formik = useFormikContext();

  const errors = fields.filter((f: string) => _.get(formik, `errors.${f}`));

  return (
    <div
      className={clsx("accordion-item", {
        active: isActive,
        error: errors.length,
      })}
    >
      <button
        className={clsx("accordion-banner", {
          active: isActive,
        })}
        onClick={setActive}
      >
        <span>{title}</span>
      </button>

      {isActive && component}
    </div>
  );
};

const Accordion = (properties: Props) => {
  const { title } = properties;
  const { all } = useStepper(properties);

  return (
    <>
      {title && <h2 className="section-header">{title}</h2>}

      <div className={`accordion-body`}>
        {all.map((item) => {
          return <AccordionItem key={item.title} {...item} />;
        })}
      </div>
    </>
  );
};

export default Accordion;
