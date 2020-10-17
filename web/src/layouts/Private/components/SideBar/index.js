import React from "react";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";

import MainItems from "./components/MainItems";
import SecondaryItems from "./components/SecondaryItems";

import { useApplication } from "../../../../hooks/ApplicationContext";

import useStyles from "./styles";

const SideBar = () => {
  const classes = useStyles();

  const applicationContext = useApplication();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !applicationContext.state.drawerOpen && classes.drawerPaperClose
        ),
      }}
      open={applicationContext.state.drawerOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={applicationContext.handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <MainItems />
      </List>
      <Divider />
      <List>
        <SecondaryItems />
      </List>
    </Drawer>
  );
};

export default SideBar;
