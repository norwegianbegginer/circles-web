import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
    marginRight: "10%",
    flex: 1,
    height: "70%",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
    },
    welcome: {
      display: "flex",
      flexDirection: "column"
    },
    avatarContainer: {
      position: "relative",
    },
  welcomeWraper: {
      position: "relative",
      display: "flex",
    },
    greetings: {
      width: "100%",
      color: "white",
      margin: 0,
      textShadow: "1px 3px 3px rgba(0, 0, 0, .25)",
      fontFamily: "'Roboto Condensed', sans-serif",
      fontWeight: 400

    },
    suggestionsInfo: {
      width: "100%",
      margin: 0,
      color: "white",
      fontSize: "26px",
      textShadow: "1px 3px 3px rgba(0, 0, 0, .25)"
    },
  }));

  export default useStyles;
