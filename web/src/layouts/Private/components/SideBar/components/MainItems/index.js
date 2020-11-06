import React, { useCallback } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Dashboard,
  AccountTreeSharp,
  LabelOutlined,
  ListSharp,
} from "@material-ui/icons";

import history from "../../../../../../services/history";

const MainItems = () => {
  const handleClickMenu = useCallback((menu) => {
    history.push(menu);
  }, []);

  return (
    <>
      {/* <ListItem button>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem> */}
      <ListItem button onClick={() => handleClickMenu("projects")}>
        <ListItemIcon>
          <AccountTreeSharp />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItem>
      <ListItem button onClick={(e) => handleClickMenu("tasks")}>
        <ListItemIcon>
          <ListSharp />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItem>
      {/* <ListItem button onClick={(e) => handleClickMenu("categories")}>
        <ListItemIcon>
          <LabelOutlined />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem> */}
    </>
  );
};

export default MainItems;
