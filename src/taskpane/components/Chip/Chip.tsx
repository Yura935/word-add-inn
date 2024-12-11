import * as React from "react";

import "./Chip.css";

type Props = {
  children: React.ReactNode;
};

export const Chip: React.FC<Props> = ({ children }) => {
  return <span className="chip">{children}</span>;
};
