import * as React from "react";
import { InvalidControl } from "../../types";
import { errorMessages, Flags, validatorsRegExp } from "../../../constants";
import { isValidTag } from "../../utils";

const Button = React.lazy(() => import("@fluentui/react-components").then((mod) => ({ default: mod.Button })));

// Types for the props that the component expects
type Props = {
  setIsLoading: (isLoading: boolean) => void;
  onSubmit: (invalidTags: InvalidControl[]) => void;
};

export const Validator: React.FC<Props> = ({ setIsLoading, onSubmit }) => {
  const contentControlsRef = React.useRef<InvalidControl[]>([]);
  const originalColorsMap = React.useMemo(() => new Map(), []);

  // Get the user's date format
  const getUserDateFormat = () => {
    const formatter = new Intl.DateTimeFormat(undefined);
    const parts = formatter.formatToParts(new Date());
    return parts
      .filter((part) => part.type !== "literal")
      .map((part) => part.type)
      .join(parts.find((part) => part.type === "literal").value);
  };

  // Change the range color of the content control
  const changeRangeColor = async (
    control: Word.ContentControl,
    context: Word.RequestContext,
    highlightColor?: string,
    color?: string
  ) => {
    const range = control.getRange();
    range.load("font/color");
    await context.sync();
    let originalColor = originalColorsMap.get(control.id);

    if (!originalColor) {
      originalColorsMap.set(control.id, range.font.color);
      originalColor = range.font.color;
    }

    range.font.highlightColor = highlightColor ?? null;
    range.font.color = color ?? originalColor;
  };

  // Validate each content control
  const validateControl = async (control: Word.ContentControl, context: Word.RequestContext) => {
    const [tagType, flag] = control.tag?.split("_") ?? [];
    const isControlUnique = !contentControlsRef.current.some((item) => item.id === control.id);

    if (isControlUnique) {
      try {
        // Load necessary properties in one go
        control.load(["text", "contentControls"]);
        await context.sync(); // Only one sync here
        control.contentControls.load("items");
        await context.sync(); // Only one sync here

        // Check if nested content controls are present
        if (control.contentControls?.items?.length > 0) {
          // Skip processing text of nested controls
          return;
        }

        if (isValidTag(tagType, flag)) {
          const validator =
            tagType === "dt" ? validatorsRegExp[tagType][getUserDateFormat()] : validatorsRegExp[tagType];
          const newControl: InvalidControl = {
            title: control.title,
            text: control.text,
            tag: control.tag,
            id: control.id,
            error: "",
          };

          const isEmptyText = !control.text || control.text.trim() === "";
          const isValidText = validator.test(control.text);
          const isFieldInvalid = flag === Flags[0] ? isEmptyText || !isValidText : !isEmptyText && !isValidText;

          // Set error messages based on validation results
          if (flag === Flags[0]) {
            newControl.error = isEmptyText ? errorMessages.empty : !isValidText ? errorMessages[tagType] : "";
          } else {
            newControl.error = !isEmptyText && !isValidText ? errorMessages[tagType] : "";
          }

          // Change the color of the range to highlight invalid fields
          changeRangeColor(control, context, isFieldInvalid ? "yellow" : null, isFieldInvalid ? "red" : null);
          contentControlsRef.current.push(newControl);
        }
      } catch (error) {
        console.error(`Error processing control ID ${control.id}:`, error);
      }
    }
  };

  // Function to validate all content controls recursively
  const validateContentControlsRecursively = async () => {
    setIsLoading(true);
    contentControlsRef.current = [];

    await Word.run(async (context) => {
      const contentControls = context.document.contentControls;

      // Load the items of content controls
      contentControls.load("items");
      await context.sync(); // Load content controls in one sync call

      // Validate each content control
      for (const control of contentControls.items) {
        await validateControl(control, context);
      }

      await context.sync();
      setIsLoading(false);
      onSubmit(contentControlsRef.current);
    });
  };

  return (
    <Button appearance="primary" onClick={validateContentControlsRecursively}>
      Validate
    </Button>
  );
};
