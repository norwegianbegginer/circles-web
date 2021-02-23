import React from "react";
import useStyles from "./styles";
import { Box, IconButton, Icon, Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useLittera } from "react-littera";

import translations from "./trans";

const Menu = () => {
  const translated = useLittera(translations);
  const classes = useStyles();
  const history = useHistory();

  const handleNavigation = (path: string) => () => {
    history.push(path);
  }

  const checkActive = (label: "people" | "rooms") => history.location.pathname.includes(label);

  return (
    <Box className={classes.menu}>

      <MenuItem isActive={checkActive("people")} onNavigation={handleNavigation("/home/people")} icon="people" label={translated.people} />
      <MenuItem isActive={checkActive("rooms")} onNavigation={handleNavigation("/home/rooms")} icon="chat" label={translated.rooms} />

    </Box>
  );
};

const MenuItem = (props: { onNavigation: () => void; isActive: boolean, icon: string, label: string }) => {
  const classes = useStyles();

  const color = props.isActive ? "primary" : "inherit";

  return <Tooltip title={props.label}>
    <IconButton aria-label={props.label} color={color} classes={{ root: classes.icon }} onClick={props.onNavigation}>
      <Icon>{props.icon}</Icon>
    </IconButton>
  </Tooltip>
}

export default Menu;
