import * as React from "react";
import { useState } from "react";
import MobileRightMenuSlider from "@material-ui/core/Drawer";
import { makeStyles } from "@mui/styles";
import {
  AppBar,
  Toolbar,
  ListItem,
  IconButton,
  ListItemText,
  Avatar,
  Divider,
  List,
  Typography,
  Box,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { ListItemIcon } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import MapIcon from "@mui/icons-material/Map";
import InfoIcon from "@mui/icons-material/Info";
import avatar from "./avatar.png";
import { Link } from "react-router-dom";

// CSS STYLES
const useStyles = makeStyles((theme) => ({
  menuSliderContainder: {
    width: 250,
    background: "text.primary",
    height: "100%",
  },
  avatar: {
    display: "flex",
    margin: "0.5rem auto",
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  listItem: {
    color: "black",
  },
}));

const menuItems = [
  {
    listIcons: <DashboardIcon />,
    listText: "Articles",
  },
  {
    listIcons: <SearchIcon />,
    listText: "TopNews",
  },
  {
    listIcons: <MapIcon />,
    listText: "RouteMap",
  },
  {
    listIcons: <InfoIcon />,
    listText: "About",
  },
];

function NavBar() {
  const [state, setState] = useState({
    right: false,
  });

  const toggleSlider = (slider, open) => () => {
    setState({
      ...state,
      [slider]: open,
    });
  };
  const classes = useStyles();

  const sideList = (slider) => (
    <Box
      className={classes.menuSliderContainder}
      component="div"
      onClick={toggleSlider(slider, false)}
    >
      <Avatar className={classes.avatar} src={avatar} alt="Ethan Su" />
      <Typography color="black" align="center" style={{ fontWeight: 600 }}>
        Ethan Su
      </Typography>
      <Divider />
      <List>
        {menuItems.map((element, index) => (
          <ListItem button key={index}>
            <ListItemIcon className={classes.listItem}>
              {element.listIcons}
            </ListItemIcon>
            <Link to={`/${element.listText}`}>
              <ListItemText
                primary={element.listText}
                className={classes.listItem}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar position="static" style={{ background: "#38B6FF" }}>
          <Toolbar>
            <IconButton onClick={toggleSlider("right", true)}>
              <ArrowBack />
            </IconButton>
            <Typography varient="h5"> Personal Planner</Typography>
            <MobileRightMenuSlider
              anchor="left"
              open={state.right}
              onClose={toggleSlider("right", false)}
            >
              {sideList("right")}
            </MobileRightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
export default NavBar;
