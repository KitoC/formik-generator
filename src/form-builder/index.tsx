import { useMemo } from "react";
import _ from "lodash";
import { Formik, Field, Form } from "formik";
import defaultStyles from "./form-builder.styled";
import { RenderFieldProps, Config } from "./form-builder.types";
import components from "./components";
import Progress from "./components/progress";
import { FormGeneratorProvider } from "./FormGeneratorContext";
import useParseSchema from "./FormGeneratorContext/utils/useParseSchema";
import makeYupValidation from "./FormGeneratorContext/utils/makeYupValidation";
import { createGlobalStyle } from "styled-components";

interface Props {
  config: Config;
  data: any;
}

const getComponent = (component: string) => {
  return _.get(components, component, () => {
    throw Error(`Component '${component}' does not exist`);
  });
};

const handleValidate = (validate: any, component: string) => {
  return async (value: any) => {
    try {
      if (validate) {
        await makeYupValidation({ validate }).validate(value);
      }
    } catch (error) {
      return error.message;
    }
  };
};
let stepperDepth = 1;

const RenderField = (properties: RenderFieldProps) => {
  const {
    props,
    name,
    validate,
    children,
    component,
    indexPath,
    path,
  } = properties;

  const Component = getComponent(component);

  if (component.includes("stepper")) {
    stepperDepth += 1;
  }

  if (!children) {
    return (
      <Field
        name={name}
        {...props}
        validate={handleValidate(validate, component)}
        component={Component}
      ></Field>
    );
  }

  return (
    <Component
      {...props}
      component={component}
      name={name}
      indexPath={indexPath}
      path={path}
      stepperDepth={stepperDepth}
    >
      {Object.entries(children).map(([cName, child], cIndex) => (
        <RenderField
          index={cIndex}
          key={cName}
          name={cName}
          indexPath={`${indexPath}.${cIndex + 1}`}
          path={`${path}.${cName}`}
          {...child}
        />
      ))}
    </Component>
  );
};

const FormBuilder = (properties: Props) => {
  const { config, data } = properties;
  const { onSubmit, schema } = config;

  const FormStyles = useMemo(
    () => createGlobalStyle`
  ${defaultStyles}
  `,
    []
  );

  const { validationSchema, steps } = useParseSchema(config);

  const RootComponent = getComponent(
    _.get(config, "component", "section.basic")
  );

  return (
    <>
      <FormStyles />

      <Formik
        initialValues={data}
        onSubmit={onSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        <FormGeneratorProvider
          steps={steps}
          validationSchema={validationSchema}
          config={config}
          data={data}
        >
          <Form onSubmit={(e) => e.preventDefault()}>
            <h2 className="section-header">{_.get(config, "name")}</h2>

            <Progress config={config}>
              <RootComponent {..._.get(config, "props", {})}>
                {Object.entries(schema).map(([name, child], index) => (
                  <RenderField
                    index={index}
                    key={name}
                    name={name}
                    indexPath={`${index + 1}`}
                    path={name}
                    {...child}
                  />
                ))}
              </RootComponent>
            </Progress>
          </Form>
        </FormGeneratorProvider>
      </Formik>
    </>
  );
};

export default FormBuilder;
