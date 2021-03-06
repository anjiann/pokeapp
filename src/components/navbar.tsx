import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import authService from "../services/authService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Navbar: React.FunctionComponent<any> = () => {
  const classes = useStyles();
  const currUser = authService.getCurrentUser();
  
  

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        position="fixed"
        style={{ backgroundColor: "#c91104", width: "100vw" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
        
            <div>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </div>
           
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
        
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
