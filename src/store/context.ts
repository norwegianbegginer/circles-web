import Account from "api/models/Account.model";
import React from "react";

export interface IPreferences {
    backgroundTheme: { id: string, url: string, label: string }
}

export interface IState {
    currentAccount?: Account;
    preferences: Partial<IPreferences> | {};
}

export const INITIAL_STATE: IState = Object.freeze({
    currentAccount: undefined,
    preferences: {
        backgroundTheme: null
    }
})

/**
 * Our holy Store!
 */
export const StoreContext = React.createContext<[IState, React.Dispatch<React.SetStateAction<IState>>]>([INITIAL_STATE, () => {}]);