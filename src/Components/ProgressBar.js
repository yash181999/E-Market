import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

function ProgressBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
      <h4>Please Wait</h4>
    </div>
  );
}

export default ProgressBar;
