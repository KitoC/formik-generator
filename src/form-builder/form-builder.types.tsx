import React from "react";

export type Validate = {
  [key: string]: string | { message: string; value: any };
};

export interface Field {
  schema: Field[];
  name: any;
  Component: React.FC;
  touched: boolean;
  isActive: boolean;
  setActive: () => void;
}

export interface ComponentConfig {
  component?: any;
  name?: string;
  props?: any;
  children?: { [key: string]: ComponentConfig };
  validate?: Validate;
}

export interface RenderFieldProps extends ComponentConfig {
  path?: string;
  validate?: Validate;
  indexPath?: string;
  index?: number;
  config?: any;
  children?: { [key: string]: ComponentConfig };
}

export interface Schema {
  [key: string]: ComponentConfig;
}

export interface Config {
  schema: Schema;
  initialStep?: string;
  progress?: ComponentConfig;
  validationSchema?: any;
  onSubmit: () => void;
}
