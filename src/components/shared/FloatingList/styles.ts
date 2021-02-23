// Here we define styles for the component.

import { createStyles, Theme } from "@material-ui/core";

// eslint-disable-next-line import/no-anonymous-default-export
export default ((theme: Theme) => createStyles({
    root: {
        position: "relative",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",

        width: 385,
        minWidth: 296,

        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[5],

        overflow: "hidden",

        transition: "all 255ms ease"
    },
    expanded: {
        height: "100%",
        maxHeight: "100%",

        borderRadius: `${theme.shape.borderRadius * 3}px 0 0 0`,

        margin: "auto 0 auto"
    },
    unexpanded: {
        height: "80vh",
        maxHeight: "80vh",

        borderRadius: theme.shape.borderRadius * 3,

        margin: "auto 10px auto 0"
    },

    list: {
        position: "relative",

        flex: 1,

        overflow: "auto"
    }
}));