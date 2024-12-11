/* global Word console */
import * as React from "react";

import { InvalidControl } from "../../types";
import { Chip } from "../Chip";

import "./List.css";

type Props = {
  control: InvalidControl;
  selected: boolean;
  onSelect: (controlId: number) => void;
};

export const ListItem: React.FC<Props> = ({ control, selected, onSelect }) => {
  const focusOnContentControl = async (controlId) => {
    onSelect(controlId);
    await Word.run(async (context) => {
      const contentControls = context.document.contentControls;
      contentControls.load("items");
      await context.sync();

      const targetControl = contentControls.items.find((control) => control.id === controlId);

      if (targetControl) {
        targetControl.select();
        await context.sync();
      } else {
        console.error("Content control not found.");
      }
    });
  };

  return (
    <div className={`list-item ${selected && "selected"}`} onClick={() => focusOnContentControl(control.id)}>
      <div className="title">
        <Chip>{control.tag}</Chip>
        <h5>{control.title}</h5>
      </div>
      <p className="error">{control.error}</p>
    </div>
  );
};
