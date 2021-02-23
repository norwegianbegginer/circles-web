import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    topMenu: {
        display: "flex",
    },
    // listWrapper: {
    //     position: "relative",
    //     overflowY: "scroll",
    //     width: "100%",
    //     height: "calc(100% - 100px)",
    // },
    // roomWrapper: {
    //     position: "relative",
    //     margin: "auto 10px auto 0",
    //     width: "385px",
    //     backgroundColor: "#fff",
    //     boxShadow: "7px 11px 15px rgba(0, 0, 0, .25)",
    //     borderRadius: "20px",
    //     height: "80vh",
    //     overflow: "hidden",
    //     minWidth: "296px",
    //     transition: "all 255ms ease"
    // },
    // roomWrapperExpanded: {
    //     margin: "auto 0px auto 0",
    //     width: "385px",
    //     boxShadow: "7px 11px 15px rgba(0, 0, 0, .25)",
    //     borderRadius: "20px 0px 0 20px",
    //     height: "100%",
    //     minWidth: "296px",
    // },
    roomsButton: {
        display: "block",
        width: "100%",
        height: "100px",
        backgroundColor: "#fff",
        borderRadiusBottom: "1px solid #eee",
        borderRadius: "0px"
    },
    roomItemWrapper: {
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
    avatarPlaceholder: {
        height: "42px",
        width: "42px",
        borderRadius: "42px",
        backgroundColor: "#9C6",
        marginRight: "20px"
    },
    lastMessageTypography: { fontSize: "14px", opacity: 0.45, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }
  }));

  export default useStyles;
