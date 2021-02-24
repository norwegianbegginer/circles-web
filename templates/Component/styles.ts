// Here we define styles for the component.
import { createStyles, Theme, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        // Container styles...
    },
    h4: {
        // Head text styles...
        color: theme.palette.primary.main
    }
}));