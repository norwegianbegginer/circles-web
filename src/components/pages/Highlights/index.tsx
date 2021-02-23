import React, { useEffect, useState } from "react";
import { useLittera } from "react-littera";
import useStyles from "./styles";
import translations from "./trans";
import { Box, Typography } from "@material-ui/core";
import { useStore } from "store/hooks";
import AccountSuggestions from "components/common/AccountSugestions";
import AccountFavContacts from "components/common/AccountFavContacts";
import { useLocation } from "react-router-dom";

/**
 * Home page component.
 */
const Highlights = () => {
  const [translated] = useLittera(translations);
  const classes = useStyles();
  const location = useLocation();

  const currentAccount = useStore((state) => state.currentAccount);

  const shouldDisplay = findPathNameEnding(location.pathname.toLowerCase(), ["rooms", "people"]);
  if(!shouldDisplay)
    return null;

  return (
    <Box className={classes.root}>
      <Box className={classes.welcomeWraper}>
        <Box className={classes.welcome}>
          <Typography className={classes.greetings} variant="h2">
            {translated.greeting}, {currentAccount?.details?.first_name}!
          </Typography>
          <Typography className={classes.suggestionsInfo} variant="h5">
            {translated.suggestions}
          </Typography>
        </Box>
      </Box>
      <AccountFavContacts />
      <AccountSuggestions />
    </Box>
  );
};

export default Highlights;

const findPathNameEnding = (pn: string, heap: string[]) =>
  heap.includes(pn.split("/").reverse()[0]);
