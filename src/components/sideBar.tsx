import React from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SportsEsportsTwoToneIcon from "@material-ui/icons/SportsEsportsTwoTone";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";

const drawerWidth = 175;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    toolbar: {
      zIndex: -1,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawerPaper: {
      width: drawerWidth,
    },
  })
);

export default function MiniDrawer() {
  const classes = useStyles();

  const renderSwitch = (index: number): any => {
    switch (index) {
      case 0:
        return <FavoriteTwoToneIcon />;
      case 1:
        return <PeopleOutlineTwoToneIcon />;
      case 2:
        return <SportsEsportsTwoToneIcon />;
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Divider />

        <List>
          {[
            ["Favourites", "/fav"],
            ["Teams", "/teams"],
            ["Game", "/game"],
          ].map((el, index) => (
            <ListItem button key={el[0]} component={Link} to={el[1]}>
              <ListItemIcon>{renderSwitch(index)}</ListItemIcon>
              <ListItemText primary={el[0]} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
      </main>
    </div>
  );
}
