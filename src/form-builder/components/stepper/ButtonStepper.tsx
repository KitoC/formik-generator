import React from "react";
import _ from "lodash";
import useStepper from "../utils/useStepper";

const Stepper = (props: any) => {
  const { title, blockProgress } = props;

  const { current, prev, next, all } = useStepper(props);

  const nextDisabled = blockProgress && _.get(current, "errors", []).length;

  if (!all.length) {
    return null;
  }

  return (
    <>
      {title && <h2 className="section-header">{title}</h2>}

      {current.component}

      <div className="button-bar">
        {prev && (
          <button className="button" onClick={prev.setActive}>
            <span>Previous Step</span>
            <span className="title">{prev.title}</span>
          </button>
        )}

        {next && (
          <button
            disabled={nextDisabled}
            className="button"
            onClick={next.setActive}
          >
            <span>Next Step</span>
            <span className="title">{next.title}</span>
          </button>
        )}
      </div>
    </>
  );
};

export default Stepper;
