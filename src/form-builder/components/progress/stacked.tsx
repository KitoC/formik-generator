import React from "react";
import clsx from "clsx";
import _ from "lodash";
import useStepper, { StepOption } from "../utils/useStepper";

type StepProps = {
  children: any;
  nested?: boolean;
} & StepOption;

type Props = {
  config?: any;
  nested?: boolean;
  parent: any;
};

const Step = (props: StepProps) => {
  const { title, isActive, nested, setActive, children } = props;
  let status = isActive ? "doing" : "todo";

  if (!isActive) {
    status = "done";
  }

  return (
    <div
      className={clsx({
        active: isActive,
        ["form-step"]: !nested,
        nested,
      })}
      onClick={setActive}
    >
      <p
        className={clsx(
          `au-progress-indicator__link au-progress-indicator__link--${status}`,
          { active: isActive }
        )}
      >
        {title}
      </p>
      {isActive && children}
    </div>
  );
};

const Steps = ({ nested, parent }: Props) => {
  const { all } = useStepper(parent);

  return (
    <>
      {all.map((step: StepOption) => (
        <Step key={step.title} nested={nested} {...step}>
          {!!step.subSteps.length && (
            <div className="sub-progress">
              <Steps parent={{ path: step.path, ...step.props }} nested></Steps>
            </div>
          )}
        </Step>
      ))}
    </>
  );
};

const StackedProgressor = (props: Props) => {
  const { config } = props;

  return (
    <div className="progress stacked">
      <h2 className="section-header">Progress</h2>

      <div>
        <Steps parent={config.props}></Steps>
      </div>
    </div>
  );
};

export default StackedProgressor;
