import { Validators } from "../../constants";

export const isValidTag = (tagTypePrefix?: string, isMandatory?: string) => {
  return Validators.includes(tagTypePrefix) && isMandatory;
};
