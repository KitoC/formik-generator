import { useEffect } from "react";
import _ from "lodash";
import * as Yup from "yup";

import { State } from "../reducer";

interface HookArgs {
  state: State;
  actions: any;
  isValid: boolean;
  setErrors: (errors: any) => void;
  formValues: any;
  validationSchema: any;
  steps: any;
}

const validateFields: (args: any) => Promise<void> = ({
  fieldSchema,
  values,
}) =>
  new Promise(async (resolve, reject) => {
    const errors: any = {};
    let hasErrors = false;

    for (let field in fieldSchema) {
      try {
        await Yup.object().shape(fieldSchema).validateAt(field, values);
      } catch (err) {
        errors[field] = err.message;
        hasErrors = true;
      }
    }

    if (hasErrors) {
      return reject(errors);
    } else {
      return resolve();
    }
  });

const useStepValidation = (args: HookArgs) => {
  const {
    state,
    actions,
    formValues,
    validationSchema,
    steps,
    setErrors,
  } = args;

  const { stepper } = state;

  useEffect(() => {
    if (stepper.next > stepper.current && stepper.validating) {
      const fieldSchema = {};

      Object.entries(steps.meta).forEach(([stepIndex, { path }]: any) => {
        if (stepIndex >= stepper?.current && stepIndex < stepper?.next) {
          _.merge(fieldSchema, _.get(validationSchema, path, {}));
        }
      });

      const fieldsToValidate = Object.keys(fieldSchema || {});
      const values = _.pick(formValues, fieldsToValidate);

      const setNextStep = () => {
        setErrors({});

        actions.setActiveStep(stepper?.next);
      };

      const setValidatingFalse = () => actions.setValidatingStep(false);

      validateFields({ fieldSchema, values })
        .then(setNextStep)
        .catch(setErrors)
        .finally(setValidatingFalse);
    } else if (stepper?.validating) {
      actions.setActiveStep(stepper?.next);
      actions.setValidatingStep(false);
    }
  }, [stepper?.validating]);
};

export default useStepValidation;
