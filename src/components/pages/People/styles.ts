import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: "3vh",
    width: "100%",
    textAlign: "center",
    borderBottom: "2px #999 solid",
  },
  root: {
    position: "relative",
    margin: "auto 10px auto 0",
    width: "385px",
    backgroundColor: "#fff",
    boxShadow: "7px 11px 15px rgba(0, 0, 0, .25)",
    borderRadius: "20px",
    height: "80vh",
    overflow: "hidden",
    minWidth: "296px",
    transition: "all 255ms ease",
  },
  personData: {
    overflow: "hidden",
    width: "100%",
    padding: "30px 24px",
    textAlign: "left",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "backgroundColor 255ms ease",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    }
  },
  contacts: {
    width: "100%",
  },
  avatar: {
  },
  text: {
    width: "100%",
    textAlign: "center",
  },
  subtitle: { fontSize: "14px", opacity: 0.45, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }
}));

  export default useStyles;
