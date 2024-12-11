import * as React from "react";

import { InvalidControl } from "../../types";
import { Filter } from "../Filter";
import { ListItem } from "./ListItem";

import "./List.css";

type Props = {
  invalidControls: InvalidControl[];
};

export const List: React.FC<Props> = ({ invalidControls }) => {
  const [controls, setControls] = React.useState([...invalidControls]);
  const [selectedControlId, setSelectedControlId] = React.useState<number>();

  const onFilterHandler = (filterValue: string) => {
    setControls((prevState) => {
      if (!filterValue) return invalidControls;
      return prevState.filter((control) => control.title.toLowerCase().includes(filterValue.toLowerCase()));
    });
  };

  return (
    <div className="list-box">
      {invalidControls.length > 0 ? (
        <>
          <Filter onFilter={onFilterHandler} />
          {controls.length > 0 ? (
            <div className="list">
              {controls.map((control) => (
                <ListItem
                  control={control}
                  key={control.id}
                  selected={selectedControlId === control.id}
                  onSelect={(controlId) => setSelectedControlId(controlId)}
                />
              ))}
            </div>
          ) : (
            <p className="empty">No validation errors found.</p>
          )}
        </>
      ) : (
        <p className="empty">
          No validation errors found. Please click on &apos;Validate&rsquo; button to see the result.
        </p>
      )}
    </div>
  );
};
