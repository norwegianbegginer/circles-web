import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    fontSize: "40px",
    cursor: "pointer",
    color: "white",
    "& svg": {
      boxShadow: "1px 3px 3px rgba(0, 0, 0, .25)",
    },
  },
  menu: {
    marginTop: "10vh",
    display: "flex",
    flexDirection: "column",
    color: "#FFF"
  },
  icon: {
    margin: "10px auto",
  }
}));

export default useStyles;
