import React, { useEffect } from 'react';
import logo from "assets/circles-logo.svg";
import useStyles from "./styles";
import Flex from 'components/utils/Flex';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'store/hooks';
import { useStorage } from 'storage/hooks';
import { AccountInfo, AccountLogin, AccountChange } from 'api/commands';
import { setBackgroundTheme, setCurrentAccount } from 'store/actions';
import { useDispatchCommand } from 'api/hooks';
import firebase from "firebase/app"
import { useSnackbar } from "notistack";
import { backgroundThemes } from 'utils/backgroundThemes';
import Account from 'api/models/Account.model';

const Splash = () => {
    const history = useHistory();
    const state = history.location.state as { initialPath?: string };

    const classes = useStyles();

    const dispatch = useDispatch();
    const dispatchCommand = useDispatchCommand();

    const { enqueueSnackbar } = useSnackbar();

    const accountIdToken = useStorage(storage => storage.accountIdToken);
    
    useEffect(() => {
        if(!accountIdToken) {
            history.push("/intro");
            return;
        }
        
        const fn = async () => {
            const accountLogin = await dispatchCommand(AccountLogin, accountIdToken);

            const account_id = accountLogin?.data?.account_id;
            if(account_id) {
                const accountInfo = (await dispatchCommand(AccountInfo, account_id, true, true, true));
                if(accountInfo.status === 200) {
                    dispatch(setCurrentAccount(new Account({ id: account_id, ...accountInfo.data })));

                    // Initialize bgTheme.
                    const bgThemeId = localStorage.getItem('background-theme') || '1922729';
                    const bgTheme = (backgroundThemes.find(bgT => bgT.id.toString() === bgThemeId.toString()) ?? backgroundThemes[0]) as { id: string, url: string, label: string };

                    dispatch(setBackgroundTheme(bgTheme));

                    if(accountInfo.data?.flags?.includes("needs_init")) {
                        // Navigate to welcome page.
                        history.push("/welcome")
                    } else {
                        // TODO: Find a better place for this!
                        const messaging = firebase?.messaging();
                        if(messaging && accountInfo.data) {
                          messaging?.requestPermission()
                            .then(async function() {
                              const token = await messaging.getToken();
                    
                              if((!accountInfo.data?.tokens || !accountInfo.data?.tokens?.includes(token))) {
                                
                                  let newTokens = accountInfo.data?.tokens ?? [];
                                  newTokens.push(token);
                    
                                  await dispatchCommand(AccountChange, accountInfo.data?.id, { tokens: newTokens })
                              }
                    
                              console.log(token);
                            })
                            .catch(function(err) {
                              console.log("Unable to get permission to notify.", err);
                            });
                          navigator.serviceWorker.addEventListener("message", (message) => {
                            enqueueSnackbar(message?.data?.["firebase-messaging-msg-data"]?.notification?.body);
                            console.log(message);
                          });
                        }

                        // Navigate to initial path or fallback to home.
                        history.push(state?.initialPath ?? "/home")
                    }
                } else {
                    history.push("/intro")
                }
            } else {
                history.push("/intro")
            }
        }
        fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Flex alignItems="center" justifyContent="center" width="100%" height="100vh" className={classes.root}>
            <img src={logo} alt="logo" className={classes.logo} />
        </Flex>
}

export default Splash;