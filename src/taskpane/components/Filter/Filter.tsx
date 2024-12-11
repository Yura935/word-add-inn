import * as React from "react";
import { Input } from "@fluentui/react-components";
import { Search20Regular } from "@fluentui/react-icons";

import "./Filter.css";

type Props = {
  onFilter: (filterValue: string) => void;
};

export const Filter: React.FC<Props> = ({ onFilter }) => {
  const [filterValue, setFilterValue] = React.useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="filter-container">
      <Input
        className="filter"
        type="text"
        value={filterValue}
        onChange={onChangeHandler}
        contentBefore={<Search20Regular />}
        placeholder="Search..."
      />
    </div>
  );
};
