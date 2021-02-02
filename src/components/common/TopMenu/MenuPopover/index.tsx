// Deps scoped imports.
import React, { useState } from "react";
import { Avatar, Box, Icon, List, ListItem, ListItemIcon, ListItemText, makeStyles, Popover, Typography } from "@material-ui/core";
import cx from "classnames";
import { useDispatch, useStore } from "store/hooks";
import { useLittera } from "react-littera";

// Project scoped imports.
import { makeFullName } from "utils/general";
import { Profile } from "components/pages";
import { setCurrentAccount } from "store/actions";

// Component scoped imports.
import translations from "./trans"
import styles from "./styles";
import { signOut } from "api/auth";
import { useStorageSetter } from "storage/hooks";
import SettingsDrawer from "components/common/SettingsDrawer";

/**
 * Menu Popover
 * @description The popover showed when clicking on own profile picture.
 * @version 1.0.0
 * @author Mike Eling <mike.eling97@gmail.com>
 */
const MenuPopover = (props: MenuPopoverProps) => {
    const [translated] = useLittera(translations);
    const classes = useStyles();

    const [shownSettingsDrawer, setShownSettingsDrawer] = useState(false);
    const openSettingsDrawer = () => setShownSettingsDrawer(true);
    const closeSettingsDrawer = () => setShownSettingsDrawer(false);

    const [shownProfileDrawer, setShownProfileDrawer] = useState(false);
    const openProfileDrawer = () => setShownProfileDrawer(true);
    const closeProfileDrawer = () => setShownProfileDrawer(false);

    const currentAccount = useStore(state => state.currentAccount);

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'profile-popover' : undefined;

    const accountFullName = makeFullName(currentAccount?.details?.first_name, currentAccount?.details?.last_name, currentAccount?.label ?? "Unknown");

    const storageSetter = useStorageSetter();
    const storeDispatch = useDispatch();

    const handleSignOut = async () => {
        await signOut();
        storageSetter("accountIdToken");
        storeDispatch(setCurrentAccount(null));
        window.location.reload(true);
    };

    return <>
        <Avatar aria-describedby={id} className={classes.avatar} alt="user" src={currentAccount?.avatar_url} onClick={handleClick} />

        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            classes={{
                root: cx(classes.root, props.className),
                paper: classes.popoverPaper
            }}
            style={props.style}
            anchorReference="anchorEl"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
                <Box className={classes.header} display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
                    <Avatar className={classes.avatarBig} alt={accountFullName} src={currentAccount?.avatar_url} />
                    <Typography variant="h5">{accountFullName}</Typography>
                    <Typography style={{ opacity: 0.6 }}>{currentAccount?.contact?.email}</Typography>
                </Box>

                <List aria-label="profile settings signout" style={{ width: "88%" }}>
                    <ListItem button onClick={() => { openProfileDrawer(); handleClose(); }}>
                        <ListItemIcon>
                            <Icon>person</Icon>
                        </ListItemIcon>
                        <ListItemText primary={translated.manageAccount} />
                    </ListItem>

                    <ListItem button onClick={() => { openSettingsDrawer(); handleClose(); }}>
                        <ListItemIcon>
                            <Icon>settings</Icon>
                        </ListItemIcon>
                        <ListItemText primary={translated.settings} />
                    </ListItem>

                    <ListItem button onClick={() => { handleSignOut(); handleClose(); }}>
                        <ListItemIcon>
                            <Icon>lock</Icon>
                        </ListItemIcon>
                        <ListItemText primary={translated.signOut} />
                    </ListItem>
                </List>
            </Box>
        </Popover>

        <Profile open={shownProfileDrawer} onClose={closeProfileDrawer} onOpen={openProfileDrawer} />
        <SettingsDrawer open={shownSettingsDrawer} onClose={closeSettingsDrawer} onOpen={openSettingsDrawer} />
    </>
}

// Creates a hook for generating classnames.
const useStyles = makeStyles(styles);

// Props the component accepts.
type MenuPopoverProps = {
    className?: string;
    style?: React.CSSProperties;
}

// Time to export! 🚚
export default MenuPopover;