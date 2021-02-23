import React from "react";
import cx from "classnames";
import useStyles from "./styles";
import { Box, IconButton } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import { useHistory } from "react-router-dom";

const Menu = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleNavigation = (path: string) => () => {
    history.push(path);
  }

  const checkActive = (label: "people" | "rooms") => history.location.pathname.includes(label);

  return (
    <Box className={classes.menu}>

      <IconButton className={cx(classes.icon, { [classes.iconActive]: checkActive("people") })} onClick={handleNavigation("/home/people")}>
        <PeopleIcon />
      </IconButton>

      <IconButton className={cx(classes.icon, { [classes.iconActive]: checkActive("rooms") })} onClick={handleNavigation("/home/rooms")}>
        <ChatIcon />
      </IconButton>

    </Box>
  );
};

export default Menu;
