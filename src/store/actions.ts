import config from "config/config";
import { AccountInfo } from "api/commands";
import { Client } from "api/client";
import Account from "api/models/Account.model";

const HOST_URL = config.host_url;
const cli = new Client(HOST_URL);

/**
 * Set current account.
 * @param payload Account info.
 * @see api/commands/AccountInfo
 */
export const setCurrentAccount = (payload: Account | null) => {
    return ({ type: "SET_CURRENT_ACCOUNT", payload });
}

/**
 * Update current account.
 * @param payload account_id
 * @see api/commands/AccountInfo
 */
export const updateCurrentAccount = async (account_id: string) => {
    const rq = await cli.execute(new AccountInfo(account_id, true, true, true))
    const payload = new Account(rq.data);

    return ({ type: "SET_CURRENT_ACCOUNT", payload });
}

/**
 * Set background theme.
 * @param theme 
 */
export const setBackgroundTheme = (theme: { id: string, url: string, label: string }) => {
    return ({ type: "SET_BACKGROUND_THEME", payload: theme });
}