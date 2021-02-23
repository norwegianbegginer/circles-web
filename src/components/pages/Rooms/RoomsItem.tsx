import React from 'react';
import { Typography, Box, ListItem, Avatar, Grow } from "@material-ui/core";
import { AvatarGroup, Skeleton } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { IRoom } from "types";
import useStyles from "./styles";
import { useAccount, useRoom } from 'api/hooks';
import { ensureArray } from 'utils/general';
import { useMessages } from 'api/messages';
import Account from "api/models/Account.model"

export const RoomsItem = (props: IRoom) => {
    const history = useHistory();
    const classes = useStyles();

    const roomUri = `/home/rooms/room/${props.id}`;
    const handleNavigation = () => history.push(roomUri);

    const account = useAccount();
    const room = useRoom(props.id, true);
    const messages = useMessages(props.id);

    if (!room || !room.accounts)
        return <Box className={classes.roomItemWrapper}>
            <Skeleton variant="rect" width={160} height={28} />
            <Skeleton variant="circle" width={48} height={48} />
        </Box>; 

    const lastMessage = Object.values(messages)[Object.keys(messages).length - 1];

    let lastMessageValue: string | null = lastMessage?.value ?? null;
    try {
        if (lastMessageValue)
            lastMessageValue = atob(lastMessage.value);
    } catch (err) {
        lastMessageValue = null;
        console.log(err);
    }

    const roomMembers = ensureArray(room?.accounts).filter(acc => acc.id !== account?.id).map(acc => new Account(acc));
    const roomName = roomMembers.length > 1 ? props.label : roomMembers[0].name();

    return <ListItem onClick={handleNavigation} >
        <Grow in>
            <Box className={classes.roomItemWrapper}>
                <Box style={{ marginRight: "10px", maxWidth: "220px" }}>
                    <Typography variant="h6" style={{ fontSize: "20px" }}>{roomName}</Typography>
                    {lastMessageValue && <Typography className={classes.lastMessageTypography}>{lastMessageValue}</Typography>}
                </Box>
                <AvatarGroup style={{}} max={3} spacing={16}>
                    {roomMembers.map(accountsMapAvatars)}
                </AvatarGroup>
            </Box>
        </Grow>
    </ListItem>;
};

const accountsMapAvatars = (account: Account) => {
    return <Avatar alt={account.name()} src={account.avatar_url} >
        {account.initials}
    </Avatar>
}