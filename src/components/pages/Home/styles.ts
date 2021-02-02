import { makeStyles } from "@material-ui/core";

const sidebarWidth = 114;
const sidebarMargin = 20;

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        display: "flex",
        height: "100vh",
        width: "100vw",
        maxWidth: "100%",
        overflow: "hidden",
        [theme.breakpoints.down("sm")]: {
            height: "auto"
        }
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexGrow: 2,
        width: `calc(100% - ${sidebarWidth + sidebarMargin}px)`,
        height: "100%"
    },
    sidebar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: sidebarWidth,
        marginRight: sidebarMargin,
        height: "100vh",
        padding: "15px 0",
        background: "linear-gradient(to right, rgba(0, 0, 0, 0.35), transparent)"
    },
    backgroundImage: {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "100vh",
        width: "auto",
        minWidth: "100%",
        zIndex: -2
    },
    backgroundImageBacklit: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, .2)"
    },
    mainSection: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: "calc(100vh - 72px)", // depends on appbar height.
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column-reverse",
            justifyContent: "flex-start",
            alignItems: "center"
        }
    }
}));

export default useStyles;
