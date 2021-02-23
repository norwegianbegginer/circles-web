// Deps scoped imports.
import React, { useState } from "react";
import { Avatar, Box, Icon, List, ListItem, ListItemIcon, ListItemText, makeStyles, Popover, Typography } from "@material-ui/core";
import cx from "classnames";
import { useDispatch } from "store/hooks";
import { useLittera } from "react-littera";

// Project scoped imports.
import { Profile } from "components/pages";
import { setCurrentAccount } from "store/actions";
import { useStorageSetter } from "storage/hooks";
import { signOut } from "api/auth";
import SettingsDrawer from "components/common/SettingsDrawer";
import { useAccount } from "api/hooks";

// Component scoped imports.
import translations from "./trans"
import styles from "./styles";

/**
 * Menu Popover
 * @description The popover showed when clicking on own profile picture.
 * @version 1.0.0
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

    const currentAccount = useAccount();

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'profile-popover' : undefined;

    const storageSetter = useStorageSetter();
    const storeDispatch = useDispatch();

    const handleSignOut = async () => {
        await signOut();
        storageSetter("accountIdToken");
        storeDispatch(setCurrentAccount(null));
        window.location.reload(true);
    };

    return <>
        {currentAccount &&
            <Box className={classes.avatarWrapper}>
                <Avatar variant="circle" aria-describedby={id} className={classes.avatar} alt={currentAccount?.name()} src={currentAccount?.avatar_url} onClick={handleClick} />
            </Box>
        }

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
                    <Avatar className={classes.avatarBig} alt={currentAccount?.name()} src={currentAccount?.avatar_url} />
                    <Typography variant="h5">{currentAccount?.name()}</Typography>
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