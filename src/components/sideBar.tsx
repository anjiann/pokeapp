import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
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
const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      zIndex: -1,
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const SideBar: React.FunctionComponent<any> = () => {
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
          {["Favourites", "Teams", "Game"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{renderSwitch(index)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
      </main>
    </div>
  );
};
export default SideBar;
