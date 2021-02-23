import React, { useEffect, useRef } from 'react';
import { AccountInfo } from 'api/commands';
import { useForkedState } from "utils/hooks/general";
import { isLoaded } from "api/utils";
import { useCommand } from 'api/hooks';
import { Card, CardContent, Typography, Box, Avatar, Grow } from '@material-ui/core';
import translations from "./trans";
import { useLittera } from "react-littera";
import { IAccount, TSuggestion } from "types";
import useStyles from "./styles";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { makeFullName, makeInitials } from 'utils/general';

gsap.registerPlugin(ScrollTrigger);

const Suggestion = ({suggestion, index}: {suggestion: TSuggestion, index: string}) => {
    const classes = useStyles();

    const [translated] = useLittera(translations);
    const { payload, type } = suggestion;
    const scrollRef = useRef(null);

    const accountRq = useCommand(AccountInfo, payload?.account_id);
    const [account] = useForkedState<any, IAccount>(rq => isLoaded(rq) ? rq.data : null, accountRq);
  
    useEffect(() => {
        
    }, [suggestion])

    if (!account || account.flags?.includes("needs_init")) return null; // TODO: Add a loader...

    const accountFullName = makeFullName(account.details?.first_name, account.details?.last_name, account.label);
    const accountInitials = makeInitials(account.details?.first_name, account.details?.last_name, account.label);

    return (
        <Grow in>
            <Card className={classes.card} id={index} ref={scrollRef} style={{zIndex: parseInt(index)}}>
                    <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="flex-start">
                        <Avatar className={classes.suggestionAvatar} src={account.avatar_url} alt={accountFullName} >{accountInitials}</Avatar>
                        <Box>
                            <Typography variant="h5">
                                {accountFullName}
                            </Typography>

                            <Typography>
                                {type === "never-messaged" ? translated.firstMessage : type}
                            </Typography>
                        </Box>
                    </Box>
                    </CardContent>
                </Card>
        </Grow>
    );
};

export default Suggestion;