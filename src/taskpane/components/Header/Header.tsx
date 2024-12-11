import * as React from "react";

import "./Header.css";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <img width="70" height="70" src="../../assets/logo-filled.png" alt="Arteria" title="Arteria" />
      <h1 className="ms-font-su">Arteria</h1>
    </header>
  );
};
