import _ from "lodash";

export const SET_STEPS = "SET_STEPS";
export const SET_ACTIVE_STEP = "SET_ACTIVE_STEP";
export const SET_NEXT_STEP = "SET_NEXT_STEP";
export const SET_VALIDATING_STATE = "SET_VALIDATING_STATE";

export interface Stepper {
  previous: string;
  current: string;
  next: string;
  validating: boolean;
  steps: any;
}

export interface State {
  stepper: Stepper;
}

export interface Action {
  type: string;
  payload: any;
}

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_STEPS:
      return { ...state, stepper: { ...state.stepper, steps: payload } };

    case SET_ACTIVE_STEP:
      // const previousStep = state.stepper?.previous;

      const nextState: State = {
        ...state,
        stepper: { ...state.stepper, next: "", current: payload },
      };

      return nextState;

    case SET_NEXT_STEP:
      return {
        ...state,
        stepper: { ...state.stepper, next: payload, validating: true },
      };

    case SET_VALIDATING_STATE:
      return {
        ...state,
        stepper: { ...state.stepper, validating: payload },
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default reducer;
