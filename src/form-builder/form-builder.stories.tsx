// Theirs
import React from "react";
import * as Yup from "yup";

// Ours
import FormBuilderC from "./index";

export default {
  title: "Components|Form",
};

const config = {
  onSubmit() {},
  progress: { component: "stacked.right" },
  name: "Bond loan",
  // initialStep: '2.1',
  component: "stepper.button",
  props: {
    order: ["housing", "yourDetails", "tenants"],
    validateToProgress: true,
  },
  schema: {
    housing: {
      component: "section.basic",
      props: { title: "Housing" },
      children: {
        input0: {
          component: "input.text",
          props: { label: "foo 1" },
        },
      },
    },
    yourDetails: {
      component: "stepper.accordion",
      props: { title: "Your Details", validateToProgress: true },
      children: {
        aboutYou: {
          component: "section.accordion-content",
          children: {
            attachmentOne: {
              component: "input.text",
              validate: {
                type: "string",
                min: { message: "string is too short", value: 3 },
                required: "At least one attachment required",
              },
              props: { label: "Name" },
            },
          },
        },
        contactDetails: {
          component: "section.accordion-content",
          children: {
            input1: {
              component: "input.text",
              props: { label: "foo 2" },
              validate: {
                type: "string",
                required: "This field is required",
              },
            },
          },
        },
        proofOfResidency: {
          component: "section.accordion-content",
          children: {
            input2: {
              component: "input.text",
              props: { label: "foo 2" },
            },
          },
        },
        incomeAndAssets: {
          component: "section.accordion-content",
          children: {
            input3: {
              component: "input.text",
              props: { label: "foo 2" },
            },
          },
        },
      },
    },
    tenants: {
      component: "section.basic",
      props: { title: "Tenants" },
      children: {
        input4: {
          component: "input.text",
          props: { label: "foo 3" },
        },
      },
    },
  },
};

export const FormBuilder = () => <FormBuilderC data={{}} config={config} />;
