import { useMemo } from "react";
import _ from "lodash";

import { Config, Schema } from "../../form-builder.types";
import makeYupValidation from "./makeYupValidation";

interface GetStepsArgs {
  schema: Schema;
  obj: any;
  indexPath?: string[];
  namePath?: string[];
}

export interface Step {
  name: string;
  path: string;
  props: any;
  indexPath: string;
  fields: string[];
  validateToProgress: boolean;
  subSteps: Step[];
  component: string;
}

export interface StepMeta {
  done: boolean;
  saved: boolean;
  path: string;
}

export interface ParsedSchema {
  steps: {
    meta: { [key: string]: StepMeta };
    nested: Step[];
  };
  validationSchema?: any;
}

export interface StepSchema {
  [key: string]: Step;
}

const getStepFields = (children: Schema) =>
  Object.entries(children)
    .filter(([k, { component }]) => component.includes("input"))
    .map(([name]) => name);

const getSubSteps = (children: Schema, parent: Step) => {
  const { indexPath, path } = parent;

  return Object.entries(children)
    .filter(([key, { component }]) => !component.includes("input"))
    .map(([name], index) => ({
      name,
      path: `${path}.${name}`,
      indexPath: `${indexPath}.${index + 1}`,
    }));
};

const parseSchema = (args: GetStepsArgs) => {
  const { schema, obj, indexPath = [], namePath = [] } = args;

  const setStepMeta = (path: Array<string>, value: any) => {
    const pathJoined = ["steps", "meta", ...path];

    _.setWith(
      obj,
      pathJoined,
      _.merge(_.get(obj, pathJoined, {}), value),
      Object
    );
  };

  const setValidationSchema = (path: Array<any>, value: any) => {
    const [parentPath, inputName] = path;

    _.set(obj, ["validationSchema", parentPath.join("."), inputName], value);
  };

  let useIndexPath = true;

  Object.entries(schema).forEach(([fName, fValue], index) => {
    const { component, children } = fValue;

    if (component.includes("input") && fValue.validate) {
      setValidationSchema([namePath, fName], makeYupValidation(fValue));
    }

    if (component.includes("section") || component.includes("stepper")) {
      const indexPathA = [...indexPath, `${index + 1}`];
      const namePathA = [...namePath, fName];
      const nextPath = (useIndexPath ? indexPathA : namePathA).join(".");

      const nestedPath = [
        "steps",
        "nested",
        ...indexPathA
          .map((i: any, pI) => (pI !== 0 ? ["subSteps", i - 1] : [i - 1]))
          .flat(),
      ];

      const stepMeta = {
        saved: false,
        done: false,
        path: namePathA.join("."),
      };

      const step: Step = {
        component: component,
        name: fName,
        props: fValue.props,
        validateToProgress: _.get(fValue, "props.validateToProgress", false),
        indexPath: indexPathA.join("."),
        path: namePathA.join("."),
        subSteps: [],
        fields: [],
      };

      _.set(obj, nestedPath, step);

      setStepMeta([nextPath], stepMeta);

      if (children) {
        const stepFields = getStepFields(children);

        _.set(obj, [...nestedPath, "fields"], stepFields);

        parseSchema({
          schema: children,
          obj,
          indexPath: indexPathA,
          namePath: namePathA,
        });
      }
    }
  });

  if (!indexPath.length) {
    Object.values(obj.validationSchema).forEach((validations) => {
      _.set(
        obj,
        "validationSchema.form",
        _.merge(obj.validationSchema.form || {}, validations)
      );
    });
  }
};

const useParseSchema = (config: Config) => {
  const { schema } = config;

  return useMemo(() => {
    const parsedSchema: ParsedSchema = {
      steps: { meta: {}, nested: [] },
      validationSchema: {},
    };

    parseSchema({ schema, obj: parsedSchema });

    console.log(parsedSchema);
    return parsedSchema;
  }, [schema]);
};

export { parseSchema };

export default useParseSchema;
