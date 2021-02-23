// Deps scoped imports.
import React from "react";
import { makeStyles, List, Box } from "@material-ui/core";
import cx from "classnames";
import * as CSS from "csstype";

// Project scoped imports.

// Component scoped imports.
import styles from "./styles";

/**
 * Floating list component
 * @description This is used mostly on the home page for displaying rooms and friends etc...
 * @version 1.0.0
 */
const FloatingList = (props: FloatingListProps) => {
    const classes = useStyles();

    const classesMap = {
        root: cx(classes.root, { [classes.expanded]: props.expanded, [classes.unexpanded]: !props.expanded }, props.className),
        list: cx(classes.list)
    }

    return <Box className={classesMap.root} style={props.style}>
        {props.ListHeaderComponent}

        {props.data.length > 0 ?
            <List className={classesMap.list}>

                {props.data.map((item) =>
                    <Box key={props.keyExtractor({ item })} style={props.itemWrapperStyle as any}>
                        {props.renderItem({ item })}
                    </Box>
                )}

            </List>
            // If list is empty it will display the fallback component (if provided).
            : props.ListEmptyComponent
        }

        {props.ListFooterComponent}
    </Box>
}

// Creates a hook for generating classnames.
const useStyles = makeStyles(styles);

// Props the component accepts.
type FloatingListProps<D = any> = {
    className?: string;
    style?: React.CSSProperties;

    expanded?: boolean;

    data: D[];
    renderItem: ({ item }: { item: D }) => JSX.Element | JSX.Element[] | null;
    keyExtractor: ({ item }: { item: D }) => string | number;

    itemWrapperStyle?: CSS.Properties;

    ListHeaderComponent?: JSX.Element | JSX.Element[] | null;
    ListFooterComponent?: JSX.Element | JSX.Element[] | null;
    ListEmptyComponent?: JSX.Element | JSX.Element[] | null;
}

// Time to export! 🚚
export default FloatingList;