import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
  root: {
    height: "100vh",
    boxSizing: "border-box",
    backgroundColor: "rgb(231 231 231)",
  },

  header: {
    height: "30vh",
    boxShadow: "0 10px 7px 0 #bebebe",
    padding: "10px 0",
    backgroundColor: "#ffffff",
  },

  buttons: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",

    "& button": {
      width: "120px",
      height: "40px",
    },
  },

  divider: {
    marginBottom: "16px",
  },

  content: {
    height: "65vh",
    overflowY: "auto",
  },
});
