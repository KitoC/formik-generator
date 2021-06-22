import React from "react";
import clsx from "clsx";
import _ from "lodash";
import StackedProgress from "./stacked";
import { useFormGenerator } from "../../FormGeneratorContext";

export interface ProgressProps {
  children?: any;
  config?: any;
}

const components: any = {
  stacked: StackedProgress,
};

const Progress = (props: ProgressProps) => {
  const { children, config } = props;
  const component = _.get(config, "progress.component");

  const { state } = useFormGenerator();

  const [componentStr, placement] = component.split(".");
  const ProgressComponent = components[componentStr];
  console.log("fgoo");
  return (
    <div className={clsx("progress-container", { [placement]: placement })}>
      <div className="form-container">{children}</div>

      {ProgressComponent && (
        <div className="section">
          <ProgressComponent config={config} {...props} />
        </div>
      )}
    </div>
  );
};

export default Progress;
