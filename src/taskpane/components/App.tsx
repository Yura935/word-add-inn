import * as React from "react";
import { Divider } from "@fluentui/react-components";

import { Loader } from "./Loader";
import { InvalidControl } from "../types";
import { Header } from "./Header";
import { ExportControl } from "./ExportControls";
import { Validator } from "./Validator";
import { List } from "./List";

import { useStyles } from "./App.style";

const App: React.FC = () => {
  const styles = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [controls, setControls] = React.useState<InvalidControl[]>([]);
  const invalidControls = controls.filter((control) => control.error);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header />
        <Divider className={styles.divider} />
        <div className={styles.buttons}>
          <Validator setIsLoading={setIsLoading} onSubmit={(receivedControls) => setControls(receivedControls)} />
          <ExportControl isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      </div>
      <div className={styles.content}>
        {!isLoading && <List invalidControls={invalidControls} />}
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default App;
