import React from "react";
import { makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles({
  regular: {
    color: "white",
  },
  liked: {
    color: "red",
  },
});

const Like: React.FunctionComponent<any> = ({ liked, onClick }) => {
  const classes = useStyles();

  return (
    <FontAwesomeIcon
      icon="heart"
      className={liked ? classes.liked : classes.regular}
      style={{
        margin: "0 5",
        cursor: "pointer",
      }}
      onClick={onClick}
      aria-hidden="true"
    />
  );
};

export default Like;
