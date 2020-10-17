import React from "react";

import {
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { AccountBoxOutlined, ExitToAppOutlined } from "@material-ui/icons";

import { useAuth } from "../../../../../../hooks/AuthContext";

const SecondaryItems = () => {
  const authContext = useAuth();

  return (
    <>
      <ListSubheader inset>Options</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AccountBoxOutlined />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ExitToAppOutlined />
        </ListItemIcon>
        <ListItemText primary="LogOut" onClick={authContext.signOut} />
      </ListItem>
    </>
  );
};

export default SecondaryItems;
