import * as Yup from "yup";
import _ from "lodash";
import { ComponentConfig } from "../../form-builder.types";

const makeYupValidation = (field: ComponentConfig) => {
  if (field.validate) {
    const { type = "string", ...validations } = field.validate;

    return Object.entries(validations).reduce((yup, nextVal) => {
      const [validationType, validationConfig] = nextVal;

      if (_.isString(validationConfig)) {
        return yup[validationType](validationConfig);
      }

      if (_.isObject(validationConfig)) {
        const { value, message } = validationConfig;

        return yup[validationType](value, message);
      }
      // @ts-ignore
    }, Yup[type]());
  }
  // TODO: infer type from component
};

export default makeYupValidation;
