import type { ActionState } from "@/types/index";

const makeInitialState = (
  type: ActionState["type"] = "success"
): ActionState => {
  return {
    type,
    message: ""
  };
};

export default makeInitialState;
