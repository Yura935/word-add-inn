/* global Word console */
import * as React from "react";
import { saveAs } from "file-saver";

import { Control } from "../../types";
import { isValidTag } from "../../utils";

const Button = React.lazy(() => import("@fluentui/react-components").then((mod) => ({ default: mod.Button })));

type Props = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const ExportControl: React.FC<Props> = ({ isLoading, setIsLoading }) => {
  const headers = React.useMemo(() => ["Title", "Tag", "Text"], []);
  const [controls, setControls] = React.useState<Control[]>([]);

  const exportData = () => {
    const rows = controls.map((result) =>
      [result?.title ?? "N/A", result?.tag ?? "N/A", result?.text ?? "N/A"].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "ValidationResults.csv");
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (controls.length > 0 && isLoading) {
      exportData();
    }
  }, [controls, isLoading]);

  const checkControlTagValid = async (
    control: Word.ContentControl | undefined,
    context: Word.RequestContext,
    localControls: Control[]
  ): Promise<void> => {
    if (!control) {
      return;
    }

    try {
      control.load(["text", "contentControls"]);
      await context.sync();

      if (control.contentControls.items.length === 0) {
        const [tagType, flag] = control.tag?.split("_") ?? [];
        const isControlUnique = !localControls.some((item) => item.id === control.id);

        if (isControlUnique && isValidTag(tagType, flag)) {
          const newControl: Control = { title: control.title, text: control.text, tag: control.tag, id: control.id };

          localControls.push(newControl);
        }
      }
    } catch (error) {
      console.error(`Error processing control ID ${control?.id}:`, error);
    }
  };

  const exportControlsWithValidTags = async () => {
    try {
      setControls([]);
      setIsLoading(true);
      const localControls: Control[] = [];

      await Word.run(async (context) => {
        const contentControls = context.document.contentControls;

        contentControls.load("items");
        await context.sync();

        if (contentControls.items.length > 0) {
          for (const control of contentControls.items) {
            await checkControlTagValid(control, context, localControls);
          }
        }

        await context.sync();
      });

      setControls(localControls);
    } catch (error) {
      console.error("Error exporting validation results:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button appearance="secondary" onClick={exportControlsWithValidTags}>
      Export
    </Button>
  );
};
