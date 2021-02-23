import { Avatar, Box, ListItem, Typography, Grow } from '@material-ui/core';
import React from 'react';
import { TContact } from "types";
import { useAccount } from 'api/hooks';
import useStyles from "./styles";
import { Skeleton } from '@material-ui/lab';

const ContactLabel = (props: TContact) => {
    const classes = useStyles();
    const account = useAccount(props.account_id);

    const handleClick = () => {
        // TODO: Open existing chat or create a new room. (1 on 1)
        console.warn("TODO: Open existing chat or create a new room. (1 on 1)");
    }

    if (!account)
        return <Box className={classes.personData}>
            <Skeleton variant="rect" width={160} height={28} />
            <Skeleton variant="circle" width={48} height={48} />
        </Box>; 

    return (
        <ListItem onClick={handleClick}>
            <Grow in>
                <Box className={classes.personData}>
                    <Box>
                        <Typography variant="h6" style={{ fontSize: "20px" }}>
                            {account.name()}
                        </Typography>
                        <Typography className={classes.subtitle}>{account.label}</Typography>
                    </Box>
                    <Avatar className={classes.avatar} alt={account.name()} src={account.avatar_url} />
                </Box>
            </Grow>
        </ListItem>    
    );
};

export default ContactLabel;