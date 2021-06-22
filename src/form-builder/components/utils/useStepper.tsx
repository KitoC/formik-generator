import { useFormGenerator } from "../../FormGeneratorContext";
import _ from "lodash";

export interface StepOption {
  index: number;
  component: any;
  props: any;
  path: string;
  title: string;
  name: string;
  setActive: () => void;
  isActive: number;
  fields: string[];
  subSteps: StepOption[];
}

type UseStepper = (
  parent: any
) => {
  all: StepOption[];
  current: StepOption;
  prev: StepOption;
  next: StepOption;
};

const useStepper: UseStepper = (parent = {}) => {
  const { children, validateToProgress, path } = parent;

  console.log("parent", parent);

  const { state, actions } = useFormGenerator();
  const { stepper } = state;

  let steps = stepper?.steps.nested;

  if (path) {
    const parentStep = steps.find((s: any) => s.path === path);

    // This will only work for 2 levels deep. Figure out how to kae work for deeper nesting
    if (parentStep) {
      steps = parentStep.subSteps;
    }
  }

  let currentIndex = 0;

  if (stepper?.current) {
    currentIndex = steps.findIndex((step: any) => {
      const currentStepSplit = stepper?.current.split(".");
      const stepSplit = step.indexPath.split(".");

      const isPresent = stepSplit.map(
        (value: string, index: number) => value === currentStepSplit[index]
      );

      return !isPresent.includes(false);
    });
  }

  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  const all = steps.map(function (step: any, i: number) {
    const name = _.get(step, `name`);
    const title = _.get(step, "props.title") || _.startCase(name);

    const component = _.get(children, i, step.component);

    const obj = {
      ...step,
      index: i,
      component,
      title,
      setActive(e: React.SyntheticEvent) {
        e.stopPropagation();

        const { indexPath, subSteps } = step;
        let nextStep = indexPath;

        if (subSteps.length) {
          nextStep = subSteps[0].indexPath;
        }

        validateToProgress
          ? actions.setNextStep(nextStep)
          : actions.setActiveStep(nextStep);
      },
      isActive: i === currentIndex,
    };

    return obj;
  });

  const next = all[nextIndex];
  const prev = all[prevIndex];
  const current = all[currentIndex];

  return { all, current, prev, next };
};

export default useStepper;
