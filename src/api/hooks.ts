import { useRef, useEffect } from 'react';
import { Client } from './client';
import { useSignal } from '../utils/hooks/general';
import config from '../config/config';
import { IRoom } from 'types';
import { AccountInfo, RoomInfo } from './commands';
import { useStore, useDispatch } from 'store/hooks';
import { setCurrentAccount } from 'store/actions';
import Account from "./models/Account.model";

const HOST_URL = config.host_url;
const cli = new Client(HOST_URL);

export const useCommand = (command: any, ...args: any[]) => {
    const ref = useRef(null as unknown as { status: number, data?: any, message?: string });
    const signal = useSignal();

    useEffect(() => {
        ref.current = { status: 102 };
        
        const fn = async () => {
            const _args = args || [];
            
            const rq = await cli.execute(new command(..._args))
            ref.current = rq;
            signal();
        }
        fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return ref.current;
}

/**
 * 
 * @param command 
 * @param args 
 * @example
 * const dispatchCommand = useDispatchCommand();
 * ...
 * dispatchCommand(AccountCreate, "mike.eling97@gmail.com", "ThisIsMyPassBro")
 */
export const useDispatchCommand = () => {
    const ref = useRef(null as unknown as (command: any, ...args: any[]) => Promise<{ status: number, data: any }>);
    const signal = useSignal();
    
    if(ref.current === null) {
        
        const fn = async (command: any, ...args: any[]) => {
            const _args = args || [];
            
            const rq = await cli.execute(new command(..._args))
            signal();
            return rq;
        }
        ref.current = (command: any, ...args: any[]) => fn(command, ...args);
    }
    
    return ref.current;
}

export const useAccount = (account_id?: string, updateStore: boolean = false, options?: { rooms?: boolean, flags?: boolean, contacts?: boolean }) => {
    const currentAccount = useStore(state => state.currentAccount);
    const ref = useRef<Account | null | undefined>(!account_id ? currentAccount ?? undefined : undefined);
    const dispatchStore = useDispatch();
    const dispatchCommand = useDispatchCommand();
    const signal = useSignal();

    useEffect(() => {
        const fn = async () => {
            const accountInfoRq = (await dispatchCommand(AccountInfo, account_id || currentAccount?.id, options?.flags, options?.rooms, options?.contacts ));
            
            if(accountInfoRq.status === 200) {
                const acc = new Account({ id: account_id || currentAccount?.id, ...accountInfoRq.data });

                ref.current = acc as Account | null;
                if (updateStore) dispatchStore(setCurrentAccount(acc));
                signal();
            }
        }
    
        if(account_id || currentAccount?.id)
            fn();
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account_id]);
    
    return ref.current ?? null;
}

export const useRoom = (room_id: string, accounts?: boolean) => {
    const ref = useRef<IRoom | null | undefined>();
    const dispatchCommand = useDispatchCommand();
    const signal = useSignal();

    useEffect(() => {
        const fn = async () => {
            const roomInfoRq = (await dispatchCommand(RoomInfo, room_id, !!accounts));

            if(roomInfoRq.status === 200) {
                ref.current = roomInfoRq.data as IRoom | null;
                signal();
            }
        }

        if(room_id) fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [room_id]);
    
    return ref.current ?? null;
}