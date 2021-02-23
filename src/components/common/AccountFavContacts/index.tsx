import { Avatar, Zoom } from "@material-ui/core";
import { AccountInfo } from "api/commands";
import { useCommand } from "api/hooks";
import { isLoaded } from "api/utils";
import React from "react";
import { useStore } from "store/hooks";
import { ensureArray, makeFullName, makeInitials } from "utils/general";
import { useForkedState } from "utils/hooks/general";
import useStyles from "./styles";

type AccountFavContactsProps = {

}

const AccountFavContacts = (props: AccountFavContactsProps) => {
    const classes = useStyles(); 

    const currentAccount = useStore(state => state.currentAccount ?? null);


    return <div className={classes.root}>
        {
            ensureArray(currentAccount?.friends)
                .filter(c => !!c.favorite)
                .map(c => <AccountContactBadge {...c} />)
        }
    </div>
}

type AccountContactBadgeProps = {
    account_id: string;
    favorite: boolean;
    last_contacted?: string;
}

const AccountContactBadge = (props: AccountContactBadgeProps) => {
    const classes = useStyles();
    const accountRq = useCommand(AccountInfo, props.account_id);
    const [account] = useForkedState(rq => isLoaded(rq) ? rq.data : null, accountRq);

    if (!account || account.flags?.includes("needs_init")) return null; // TODO: Add loader...

    const accountFullName = makeFullName(account.details?.first_name, account.details?.last_name, account.label);
    const accountInitials = makeInitials(account.details?.first_name, account.details?.last_name, account.label);

    return <Zoom in>
        <Avatar className={classes.image} src={account.avatar_url} alt={accountFullName}>{accountInitials}</Avatar>
    </Zoom>
}

export default AccountFavContacts