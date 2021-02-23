// Deps scoped imports.
import React from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// Project scoped imports.
import MenuPopover from "./MenuPopover";
import Logo from "../Logo";
import Flex from "components/utils/Flex";

// Component scoped imports.
import styles from "./styles";

/**
 * Example component
 * @description This is an example component including translations and theming.
 * @version 1.0.0
 * @author Mike Eling <mike.eling97@gmail.com>
 */
const TopMenu = (props: TopMenuProps) => {
    const classes = useStyles();
    const history = useHistory();

    const handleNavigation = (path: string) => () =>
        history.push(path)

    return <section className={classes.root} style={props.style}>
        <Logo style={{ fontSize: "56px", margin: "16px 0" }} onClick={handleNavigation('/home/rooms')} />
        <Flex justifyContent="flex-end" alignItems="center" className={classes.menuBar}>
            <MenuPopover />
        </Flex>
    </section>
}

// Creates a hook for generating classnames.
const useStyles = makeStyles(styles);

// Props the component accepts.
type TopMenuProps = {
    className?: string;
    style?: React.CSSProperties
}

// Time to export! 🚚
export default TopMenu;