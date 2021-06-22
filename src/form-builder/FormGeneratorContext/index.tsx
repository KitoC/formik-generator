import React, {
  createContext,
  useReducer,
  useContext,
  useMemo,
  Dispatch,
  useEffect,
} from "react";
import _ from "lodash";
import { useFormikContext } from "formik";

import { Config } from "../form-builder.types";
import reducer, {
  SET_STEPS,
  SET_ACTIVE_STEP,
  SET_NEXT_STEP,
  SET_VALIDATING_STATE,
  State,
} from "./reducer";

import useStepValidation from "./utils/useStepValidation";
import { Step, StepMeta } from "./utils/useParseSchema";

export type SortByIndexPath = (a: Step, b: Step) => number;
export type SortSteps = () => Step[];
export type FindStep = (path: string) => Step;

interface Context {
  state: State;
  actions: any;
}

interface Props {
  children?: React.ReactChild;
  config: Config;
  data: any;
  validationSchema: any;
  steps: { nested: Step[]; meta: { [key: string]: StepMeta } };
}

const initialState: State = {
  stepper: {
    steps: { flat: {}, nested: [] },
    next: "",
    previous: "",
    validating: false,
    current: "1",
  },
};

const context = createContext<Context>({ state: initialState, actions: {} });

const FormGeneratorProvider = ({
  children,
  config,
  validationSchema,
  steps,
}: Props) => {
  const formik = useFormikContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(
    () => ({
      setActiveStep: makeAction(SET_ACTIVE_STEP, dispatch),
      setNextStep: makeAction(SET_NEXT_STEP, dispatch),
      setSteps: makeAction(SET_STEPS, dispatch),
      setValidatingStep: makeAction(SET_VALIDATING_STATE, dispatch),
    }),
    []
  );

  const value = { state, actions };

  useEffect(() => {
    if (config.initialStep) {
      actions.setActiveStep(config.initialStep);
    }

    actions.setSteps(steps);
  }, [steps]);

  useStepValidation({
    state,
    isValid: formik.isValid,
    formValues: formik.values,
    setErrors: formik.setErrors,
    actions,
    validationSchema,
    steps,
  });

  console.log(formik);

  return <context.Provider value={value}>{children}</context.Provider>;
};

const makeAction = (type: string, dispatch: Dispatch<any>) => (payload: any) =>
  dispatch({ type, payload });

const useFormGenerator: () => Context = () => {
  return useContext(context);
};

export { FormGeneratorProvider, useFormGenerator, context };
